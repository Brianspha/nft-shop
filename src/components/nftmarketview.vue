<template>
<v-card>
    <v-toolbar class="header_bar" dark>
        <v-toolbar-title>Market Place</v-toolbar-title>
    </v-toolbar>
    <v-container class="fill-height padd_bottom">
        <v-row class="padd_bottom">
            <v-col v-for="(collectible,n) in collectibles" :key="n" class="float-sm-left" cols="12" sm="8" md="4">
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
                            <div class="font-weight-light grey--text title mb-2">#{{collectible.id}}</div>
                            <h3 class="display-1 font-weight-light orange--text mb-2">{{collectible.name}}</h3>
                            <div class="font-weight-light title mb-2">
                                {{collectible.detail}}
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="sellNFT(collectible)">Purchase</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" />
    </v-container>
</v-card>
</template>

<script>
import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import swal from 'sweetalert2'
export default {
    components: {
        loading
    },
    props: ['dialog'],
    data: () => ({
        collectibles: [{
                id: Math.round(Math.random() * 10000, 5),
                name: "Jumanji",
                price: Math.round(Math.random() * 10, 5),
                cryptoAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRfRMLQSvs_jU1hBU1-0a3zcirBl9jOsx30SK1RBc8ZSFzOsT4X',
                detail: "Halloooo. I'm Chubby Bubbleshands. I was once a barista at a cat café. I'm thinking of dying my fur a metallic shade of rainbow. Do you think it will suit me? I'm single and ready to mingle."
            },
            {
                id: Math.round(Math.random() * 10000, 5),
                name: "Jumanji",
                price: Math.round(Math.random() * 10, 5),
                cryptoAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRfRMLQSvs_jU1hBU1-0a3zcirBl9jOsx30SK1RBc8ZSFzOsT4X',
                detail: "Halloooo. I'm Chubby Bubbleshands. I was once a barista at a cat café. I'm thinking of dying my fur a metallic shade of rainbow. Do you think it will suit me? I'm single and ready to mingle."
            },
            {
                id: Math.round(Math.random() * 10000, 5),
                name: "Jumanji",
                price: Math.round(Math.random() * 10, 5),
                cryptoAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRfRMLQSvs_jU1hBU1-0a3zcirBl9jOsx30SK1RBc8ZSFzOsT4X',
                detail: "Halloooo. I'm Chubby Bubbleshands. I was once a barista at a cat café. I'm thinking of dying my fur a metallic shade of rainbow. Do you think it will suit me? I'm single and ready to mingle."
            },
        ],
        isDialog: false,
        isLoading: false
    }),
    beforeMount() {
        this.loadCollectibles()
    },
    methods: {
        loadCollectibles() {
            var data = {
                contractid: this.$store.state.contractID,
                memo: "getting collectible keys",
                amount: 0,
                params: `[]`,
                abi: [`{"constant":true,"inputs":[],"name":"getAllregisteredCollectibleKeys","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}`],
            }
            window.hash.triggerSmartContract(data, (err, res) => {
                if (err) {
                    console.log('something went wrong whilst selling collectible...')
                    this.isLoading = false
                } else {
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
                                if (err) {
                                    console.log('something went wrong whilst fetching collectible details...')
                                } else {
                                    this.collectibles.push({
                                        id: key,
                                        name: res[[3]],
                                        cryptoAvatar: res[[3]],
                                        detail: res[[2]],
                                        owner: res[[4]]
                                    })
                                }
                            })
                        })

                    }

                }
            })
        },
        sellNFT(nft) {
            console.log('selling nft: ', nft)
            var data = {
                contractid: this.$store.state.contractID,
                memo: "approving collectible transfer",
                amount: 0,
                params: `[${nft.owner}]`,
                abi: [`{"constant":false,"inputs":[{"name":"_approved","type":"address"},{"name":"_token","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}`],
            }
            window.hash.triggerSmartContract(data, (err, res) => {
                if (err) {
                    console.log('something went wrong whilst selling collectible...')
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
                    console.log('something went wrong whilst selling collectible...')
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
