<template>
<v-row justify="center">
    <v-dialog v-model="this.$store.state.newNFTDialog" persistent max-width="600px">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
                <v-card-title>
                    <span class="headline">New Collectible</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-btn block color="#ffc0cb" dark @click="openDialogCollectibleAvatar()">
                                <v-icon>collections</v-icon>Collectible Avatar
                            </v-btn>
                            <avatarOptions></avatarOptions>
                            <v-col cols="12">
                                <v-text-field :rules="collectibleNameRules" label="Collectible Name*" hint="E.g. Jumanji" v-model="collectibleName" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field :rules="collectiblePriceRules" label="Price*" hint="The price of the collectible in Eth e.g 1" v-model="collectiblePrice" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea :rules="collectibleDetailRules" name="input-7-1" label="Collectible Details" hint="E.g. I am a unique collectible" v-model="collectibleDetail" required></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#ffc0cb" text @click="closeModal()">Cancel</v-btn>
                    <v-btn color="#ffc0cb" text @click="addNFT()">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true" />
    </v-dialog>
</v-row>
</template>

<script>
import swal from 'sweetalert2'
import avatarOptions from './avatarOptionsList'
import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
        avatarOptions,
        loading
    },
    data: () => ({
        dialog: false,
        hasImage: false,
        image: null,
        collectibleName: '',
        collectiblePrice: '',
        collectibleDetail: '',
        nftShopContract: {},
        valid: true,
        isLoading: false,
        collectibleNameRules: [
            v => !!v || 'Collecitble Name is required',
            v => (v && v.length >= 1) || 'Collecitble Name must be greater than 1 character',
        ],
        collectiblePriceRules: [
            v => !!v || 'Collecitble Price is required',
            v => (v && !isNaN(v)) || 'Collecitble Name must be greater than 1 character',
        ],
        collectibleDetailRules: [
            v => !!v || 'Collecitble Details is required',
            v => (v && v.length >= 1) || 'Collecitble Details must be greater than 1 character',
        ],
    }),
    mounted() {
        this.init()
    },
    methods: {
        init() {
            console.log(window.hash)
        },
        addNFT() {
            this.isLoading = true
            if (this.$refs.form.validate() && this.$store.state.selectedAvatar !== '') {
                this.snackbar = true
                var data = {
                    contractid: this.$store.state.contractID,
                    memo: "adding new nft",
                    amount: 0,
                    params: `[${this.collectiblePrice},${this.collectibleName},${this.collectibleDetail},${this.$store.state.selectedAvatar}]`,
                    abi: `[{"constant":false,"inputs":[{"name":"value","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"avatar","type":"string"}],"name":"registerCollectible","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]`
                }
                window.hash.triggerSmartContract(data, (err, res) => {
                    if (err) {
                        console.log('something went wrong whilst adding new collectible...')
                        this.error('Something went wrong please try again!!')
                        this.isLoading = false
                    } else {
                        this.success('Succesfully registered new collectible')
                        this.isLoading = false
                    }
                })
            }
        },
        closeModal() {
            this.$store.state.newNFTDialog = !this.$store.state.newNFTDialog
            console.log('closedModal: ', this.$store.state.newNFTDialog)
        },
        openDialogCollectibleAvatar() {
            this.$store.state.avatarSelectDialog = true
            console.log('openinig: ', this.$store.state.avatarSelectDialog)
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
