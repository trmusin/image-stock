<template>
    <div class="card-container">
        <div class="card">
            <div class="card__item">
                <div class="options">
                    <div class="user">
                        <img :src="image.user.profile_image.large"/>
                        <p>{{image.user.first_name}}</p>
                        <span v-if="image.user.instagram_username">@{{image.user.instagram_username}}</span>
                    </div>
                    <div class="actions">
                        <i
                                class="ri-heart-fill"
                                :class="[favorites[image.id] && 'active']"
                                @click="setFavoritesItem"
                        >
                        </i>
                        <div class="arrows" @click="goToPhoto">
                            <i class="ri-arrow-right-up-line up"></i>
                            <i class="ri-arrow-left-down-line down"></i>
                        </div>
                        <i class="ri-download-fill" @click="downloadImg(image.urls.regular)"></i>
                    </div>
                </div>
            </div>
            <img :src="image.urls.small"/>
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Card",
        props: {
            image: Object,
        },
        data: () => ({
            active: false,
        }),
        computed: {
            ...mapGetters({
                favorites: 'getFavorites',
            }),
        },
        methods: {
            ...mapActions({
                setFavoritesItem: 'setFavoritesItem',
            }),
            goToPhoto() {
                this.$router.push({name: 'Photo', params: {id: this.image.id}})
            },
            setFavoritesItem() {
                // this.setFavoritesItem(this.image);
                this.$store.commit("SET_FAVORITES_ITEM", this.image)
            },
            async downloadImg(link) {
                let response = await fetch(link, {responseType: 'arraybuffer'});
                let data = await response.blob();
                let url = window.URL.createObjectURL(data);
                let a = document.createElement('a');
                a.href = url;
                a.download = "image.jpg";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        },
        mounted() {

        }
    };
</script>

<style lang="scss">

    .card-container {
        padding: 5px;
    }

    .card {
        position: relative;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        height: max-content;
        max-width: 380px;
        width: 100%;
        img {
            border-radius: 8px;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        &__item {
            box-sizing: border-box;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            border-radius: 8px;
            width: 100%;
            height: 100%;
            text-align: center;
            color: #FFFFFF;
            background: rgba(40, 36, 22, 0.5);
            backdrop-filter: blur(20px);
            padding: 20px 20px;
        }

    }

    .card:hover .card__item {
        display: flex;
    }

    .options {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        max-height: 285px;
        .user {
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 0;

            img {

                border-radius: 8px;
                width: 70px;
                height: 70px;
                object-fit: contain;
            }
            p {
                font-size: 30px;
            }
            span {
                font-size: 18px;
            }
        }

        .actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 55px;
            margin-top: 15px;
            i {
                color: #DADADA;
                font-size: 32px;
                cursor: pointer;
            }

            .active {
                color: red !important;
            }

            i:hover {
                color: #ffffff;
            }

            .arrows {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 126px;
                i {
                    font-size: 16px;
                    height: 16px;
                    margin: 0;
                }

                .up {
                    padding: 0 0 0 16px;
                }
                .down {
                    padding: 0 16px 0 0;
                }

                &:hover {
                    i {
                        color: #ffffff;
                        font-size: 27px;
                        height: 27px;
                    }

                    .up {

                        padding: 0 0 0 27px;

                    }
                    .down {
                        padding: 0 27px 0 0;
                    }
                }
            }
        }
    }

    @media (max-width: 360px) {

        .options {

            .user {

                img {

                    border-radius: 8px;
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                }
                p {
                    font-size: 24px;
                }
                span {
                    font-size: 14px;
                }
            }

            .actions {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 50px;
                margin-top: 15px;
                i {
                    color: #DADADA;
                    font-size: 28px;
                    cursor: pointer;
                }

                .active {
                    color: #ffffff;
                }

                i:hover {
                    color: #ffffff;
                }

                .arrows {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 126px;
                    i {
                        font-size: 14px;
                        height: 14px;
                        margin: 0;
                    }

                    .up {
                        padding: 0 0 0 14px;
                    }
                    .down {
                        padding: 0 14px 0 0;
                    }

                    &:hover {
                        i {
                            color: #ffffff;
                            font-size: 25px;
                            height: 25px;
                        }

                        .up {

                            padding: 0 0 0 25px;

                        }
                        .down {
                            padding: 0 25px 0 0;
                        }
                    }
                }
            }
        }

    }


</style>
