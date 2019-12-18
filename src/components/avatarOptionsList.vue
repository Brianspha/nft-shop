<template>
<v-row>
    <v-dialog v-model="this.$store.state.avatarSelectDialog" persistent>
        <v-col cols="12" sm="6" offset-sm="3">
            <v-card>
                <v-container fluid>
                    <v-row>
                        <v-col v-for="(image,index) in avatars" :key="index" class="d-flex child-flex" cols="4">
                            <v-card flat tile class="d-flex" :ripple="{ center: true }" @click="selectImage(image)">
                                <v-img :src="image.url" :lazy-src="image.url" aspect-ratio="1" class="grey lighten-2">
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="pink darken-1" text @click="closeAvatarList()">Back</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    data: () => ({
        avatars: [{
                url: 'https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_960_720.jpg'
            },
            {
                avatar: 'https://cdn.pixabay.com/photo/2016/05/12/23/03/lamb-1388937__340.png'
            }, {
                avatar: 'https://cdn.pixabay.com/photo/2016/05/12/23/03/lamb-1388937__340.png'
            },
            {
                avatar: 'https://cdn.pixabay.com/photo/2016/03/31/23/37/animal-1297724__340.png'
            },
            {
                avatar: 'https://cdn.pixabay.com/photo/2016/10/27/08/02/bird-1773631__340.png'
            }
        ]
    }),
    methods: {
        selectImage(image) {
            this.$store.state.avatarSelectDialog = false
            this.$store.state.selectedAvatar = image.url
            console.log('selectedImage: ', image)
        },
        closeAvatarList() {
            this.$store.state.avatarSelectDialog = false
        }
    }
}
</script>
