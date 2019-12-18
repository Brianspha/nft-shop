<template>
<v-card>
    <v-toolbar class="header_bar" dark>
        <v-toolbar-title>Profile</v-toolbar-title>
    </v-toolbar>
    <v-container class="fill-height padd_bottom">
        <v-btn block color="#ffc0cb" dark @click="openNFTModal()">
            <v-icon>mdi-plus</v-icon>Add Collectible
        </v-btn>
        <v-btn block color="#ffc0cb" dark @click="openNFTModal()">
            Total Raised: $ {{raised}}
        </v-btn>
        <v-tabs v-model="tab" background-color="#ffc0cb" centered dark icons-and-text>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">
                Collected Collectibles
                <v-icon>account_balance_wallet</v-icon>
            </v-tab>
            <v-tab href="#tab-2">
                Sold Collectibles
                <v-icon>attach_money</v-icon>
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <newnftview :dialognewnft="this.$store.state.newNFTDialog"></newnftview>
            <v-tab-item value="tab-1">
                <v-row class="padd_bottom">
                    <v-col v-for="(collectible,n) in collectedCollectibles" :key="n" class="float-sm-left" cols="12" sm="8" md="4">
                        <v-hover v-slot:default="{ hover }">
                            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                                <v-img :aspect-ratio="16/9" :src="collectible.cryptoAvatar">
                                    <v-expand-transition align="center">
                                        <div v-if="hover" class="d-flex transition-fast-in-fast-out header_bar darken-2 v-card--reveal display-3 white--text text-center" style="height: 100%;">
                                            ${{collectible.price}}
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                                <v-card-text class="pt-6" style="position: relative;" :ripple="{ center: true }">
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                        </template>
                                        <span>Sell</span>
                                    </v-tooltip>
                                    <div class="font-weight-light grey--text title mb-2">#{{collectible.id}}</div>
                                    <h3 class="display-1 font-weight-light orange--text mb-2">{{collectible.name}}</h3>
                                    <div class="font-weight-light title mb-2">
                                        {{collectible.detail}}
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="sellNFT(collectible)">Sell</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item value="tab-2">
                <v-row class="padd_bottom">
                    <v-col v-for="(collectible,n) in soldCollectibles" :key="n" class="float-sm-left" cols="12" sm="8" md="4">
                        <v-hover v-slot:default="{ hover }">
                            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                                <v-img :aspect-ratio="16/9" :src="collectible.cryptoAvatar">
                                    <v-expand-transition align="center">
                                        <div v-if="hover" class="d-flex transition-fast-in-fast-out header_bar darken-2 v-card--reveal display-3 white--text text-center" style="height: 100%;">
                                            ${{collectible.price}}
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                                <v-card-text class="pt-6" style="position: relative;" :ripple="{ center: true }">
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                        </template>
                                        <span>Sell</span>
                                    </v-tooltip>
                                    <div class="font-weight-light grey--text title mb-2">#{{collectible.id}}</div>
                                    <h3 class="display-1 font-weight-light orange--text mb-2">{{collectible.name}}</h3>
                                    <div class="font-weight-light title mb-2">
                                        {{collectible.detail}}
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
    <v-overlay :z-index="0" opacity="0" v-if="this.$store.registered" class="header_bar" :value="overlay">
        <v-btn class="white--text " color="#ffc0cb" @click="registerCollector()">
            Register
        </v-btn>
    </v-overlay>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" />
</v-card>
</template>

<script>
import newnftview from '../components/newcollectible'
import swal from 'sweetalert2'
import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
        newnftview,
        loading
    },
    props: ['dialognewnft'],
    data: () => ({
        soldCollectibles: [],
        collectedCollectibles: [],
        isDialogNewNFT: false,
        tab: null,
        isLoading: false,
        raised: 0
    }),
    beforeMount() {
        this.getTotalRaised()
        this.checkRegistered()
    },
    methods: {
        getTotalRaised() {
            var data = {
                contractid: this.$store.state.contractID,
                memo: "checking total raised",
                amount: 0,
                params: `[]`,
                abi: `[{"constant":true,"inputs":[],"name":"getTotalRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]`
            }
            window.hash.triggerSmartContract(data, (err, res) => {
                if (err) {
                    //error case
                    this.raised = 0
                } else {
                    //success case
                    this.raised = res[0]
                }
            });
        },
        checkRegistered() {
            this.isLoading = false
            var data = {
                contractid: this.$store.state.contractID,
                memo: "checking if user is registered",
                amount: 0,
                params: `[]`,
                abi: `[{"constant":true,"inputs":[],"name":"userRegistered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]`
            }
            window.hash.triggerSmartContract(data, (err, res) => {
                if (err) {
                    //error case
                    this.isLoading = false
                } else {
                    //success case
                    if (!res[0]) {
                        this.warnUser()
                    } else {
                        this.$store.state.registered = true
                        this.loadSoldCollectbiles()
                        this.loadCollectedCollectibles()
                        this.isLoading = false
                    }
                }
            });
        },
        loadSoldCollectbiles() {
            var data = {
                contractid: this.$store.state.contractID,
                memo: "fetching user listed collectibles",
                amount: 0,
                params: '[]',
                abi: `[{"constant":true,"inputs":[],"name":"getUserSoldCollectiblKeys","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}]`
            }
            window.hash.triggerSmartContract(data, (err, res) => {
                if (!err) {
                    if (res[0].length > 0) {
                        res[0].map((key) => {
                            data = {
                                contractid: this.$store.state.contractID,
                                memo: "fecthing collectible",
                                amount: 0,
                                params: `[${key}]`,
                                abi: [`{"constant":true,"inputs":[{"name":"collectibleID","type":"uint256"}],"name":"getCollectible","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}`],
                            }
                            window.hash.triggerSmartContract(data, (err, res) => {
                                if (!err) {
                                    this.soldCollectibles.push({
                                        id: key,
                                        name: res[[3]],
                                        cryptoAvatar: res[[3]],
                                        detail: res[[2]]
                                    })
                                }
                            })

                        })
                    } else {
                        this.soldCollectibles = []
                    }
                }
            })
        },
        loadCollectedCollectibles() {
            var data = {
                contractid: this.$store.state.contractID,
                memo: "fecthing user listed collectibles",
                amount: 0,
                params: '[]',
                abi: `[{"constant":true,"inputs":[],"name":"getUserSoldCollectiblKeys","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}]`
            }
            window.hash.triggerSmartContract(data, (err, res) => {
                if (!err) {
                    if (res[0].length > 0) {
                        res[0].map((key) => {
                            data = {
                                contractid: this.$store.state.contractID,
                                memo: "fecthing collectible",
                                amount: 0,
                                params: `[${key}]`,
                                abi: [`{"constant":true,"inputs":[{"name":"collectibleID","type":"uint256"}],"name":"getCollectible","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}`],
                            }
                            window.hash.triggerSmartContract(data, (err, res) => {
                                if (!err) {
                                    this.collectedCollectibles.push({
                                        id: key,
                                        name: res[[3]],
                                        cryptoAvatar: res[[3]],
                                        detail: res[[2]],
                                        owner: res[[4]]
                                    })
                                }
                            })
                        })
                    } else {
                        this.collectedCollectibles = []
                    }
                }
            })
        },
        warnUser() {
            swal.fire({
                title: 'Register?',
                text: "Seems like your not registered",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Register'
            }).then((result) => {
                if (result.value) {
                    var data = {
                        contractid: this.$store.state.contractID,
                        memo: "registering user",
                        amount: 0,
                        params: `[]`,
                        abi: [`{"constant":false,"inputs":[],"name":"registerUser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}`],
                    }
                    window.hash.triggerSmartContract(data, (err, res) => {
                        if (!err) {
                            this.success('Succesfully registered')
                            this.isLoading = false
                        }
                    })
                }
            })
        },
        sellNFT(nft) {
            var data = {
                contractid: this.$store.state.contractID,
                memo: "approving collectible transfer",
                amount: 0,
                params: `[${nft.owner}]`,
                abi: [`{"constant":false,"inputs":[{"name":"_approved","type":"address"},{"name":"_token","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}`],
            }
            window.hash.triggerSmartContract(data, (err, res) => {
                if (err) {
                    this.error('Something went wrong please try again!!')
                    this.isLoading = false
                } else {
                    this.transferCollectible(nft)
                }
            })
        },
        transferCollectible(nft) {
            var data = {
                contractid: this.$store.state.contractID,
                memo: "selling collectible",
                amount: 0,
                params: `[${nft.id},${nft.owner}]`,
                abi: [`{"constant":false,"inputs":[{"name":"collectibleID","type":"uint256"},{"name":"to","type":"address"}],"name":"sellCollectible","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}`],
            }
            window.hash.triggerSmartContract(data, (err, res) => {
                if (err) {
                    this.error('Something went wrong please try again!!')
                    this.isLoading = false
                } else {
                    this.success('Succesfully sold collectible')
                    this.isLoading = false
                }
            })
        },
        error(message) {
            swal.fire({
                type: 'error',
                title: 'Error',
                text: message,
                allowOutsideClick: true
            })
        },
        success(message) {
            swal.fire(
                'Success',
                message,
                'success'
            )
        },
        registerCollector() {

        },
        openNFTModal() {
            this.$store.state.newNFTDialog = true
        }

    }
}
</script>

<style scoped>
.padd_bottom {
    padding-bottom: 30px;
}

.header_bar {
    background-image: linear-gradient(to bottom left, #87ceeb 0%, #ffc0cb 65%);
}
</style>
