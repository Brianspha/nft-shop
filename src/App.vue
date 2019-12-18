<template>
<div id="app">
    <v-app id="inspire" app>
        <v-app-bar app class="green_color" color="#ffc0cb" dark>
            <v-btn class="transparent" text>
                <v-toolbar-title id="appName" :ripple="{ center: true }">HashCollect</v-toolbar-title>
            </v-btn>
            <v-btn icon>
                <v-icon to="/" :ripple="{ center: true }"></v-icon>
            </v-btn>
        </v-app-bar>
        <v-bottom-navigation cols="12" sm="8" md="4" class="fix-bottom" :value="activeBtn" color="#ffc0cb" clas fixed horizontal shift>
            <v-btn v-for="(menuItem,i) in menuItems" :key="i" :to="menuItem.to" style="width:400px" width="300">
                <span class="responsive_text">{{menuItem.text}}</span>
                <v-icon>{{menuItem.icon}}</v-icon>
            </v-btn>
        </v-bottom-navigation>
        <v-content style="width:100vw">
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</div>
</template>

<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            activeBtn: 1,
            menuItems: [{
                    to: "/profileview",
                    icon: "person",
                    text: "Profile"
                },
                {
                    to: "/nftmarketview",
                    icon: "search",
                    text: "View Collectibles"
                }
            ]
        }
    },
    mounted() {
        this.warnUnderDevelopment()
        this.checkIfComposerInstalled()
    },
    methods: {
        checkIfComposerInstalled() {
            if (!window.hash) {
                swal.fire({
                    icon: 'error',
                    title: 'Composer Not installed',
                    text: 'Seems like you dont have composer installed click on the link below to install',
                    footer: '<a href="https://chrome.google.com/webstore/detail/composer-for-hedera-hashg/hdjnnemgikeoehneddegfcmkljenlean">Install Composer</a>'
                })
            }
        },
        warnUnderDevelopment() {
            swal.fire(
                'Under Development',
                'Please note that this website is under development',
                'warning'
            )
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Courgette&display=swap');

.fix-bottom {
    position: fixed;
    bottom: 0;
}

#appName {
    font-family: 'Courgette', cursive;
    font-size: 30px;
}

html {
    overflow-y: scroll;
}

body {
    position: absolute;
}

.green_color {
    background-image: linear-gradient(to top right, #87ceeb 0%, #ffc0cb 65%);
}

html {
    font-size: calc(1em + 1vw)
}
</style>
