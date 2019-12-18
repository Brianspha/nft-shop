import vue from 'vue'
import vuerouter from 'vue-router'
import nftmarketview from '../components/nftmarketview'
import aboutnftview from '../components/aboutnftview'
import profileview from "../components/profileview";
vue.use(vuerouter)
export default new vuerouter({
    routes: [{
            path: "/",
            redirect: "nftmarketview"
        },
        {
            path: "/nftmarketview",
            name: "market",
            component: nftmarketview
        },
        {
            path: "/aboutnftview",
            name: "about",
            component: aboutnftview
        },
        {
            path: "/profileview",
            name: "profile",
            component: profileview
        }
    ],
    mode: "history"
})