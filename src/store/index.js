import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        contractID:'0.0.140204',
        registered:false,
        nftDetailsDialog:false,
        newNFTDialog:false,
        avatarSelectDialog:false,
        selectedAvatar:''
    }
})