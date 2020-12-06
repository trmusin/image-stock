<template>
    <div class="page-photo"  v-if="!loading" id="page-photo">

        <div class="wrapper" :style="{backgroundImage: `url(${image.urls.thumb})`, backgroundSize: 'cover',}">
            <div class="filter">
                <div class="photo-box">
                    <div class="photo-box__top">
                        <div class="user">
                            <img :src="image.user.profile_image.large" />
                            <div class="user__name">
                                <p>{{image.user.first_name}}</p>
                                <span v-if="image.user.instagram_username">@{{image.user.instagram_username}}</span>
                            </div>
                        </div>
                        <div class="box-buttons">
                            <div class="heartBtn" :class="[favorites[image.id] && 'active']" @click="setFavoritesItem">
                                <i class="ri-heart-fill"></i>
                            </div>
                            <button @click="downloadImg(image.urls.regular)">
                                <img src="@/assets/download.svg" />
                                <p>Downloand</p>
                            </button>
                        </div>
                    </div>
                    <div class="image">
                        <img  :src="image.urls.regular"/>
                        <a :href="image.urls.full" target="_blank">
                            <i class="ri-fullscreen-line"></i>
                        </a>
                    </div>
                    <div v-if="image.tags.length" class="photo-box__bottom">
                        <span>Похожие теги</span>
                        <div class="tags">
                            <router-link
                                    v-for="(tag, index) in image.tags"
                                    class="tags__item"
                                    :key="index"
                                    :to="`/?search=${tag.title}`"
                            >
                                {{tag.title}}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="more.length" class="photos-more">
            <div class="photos-more__items">
                <MasonryLayout
                        :images="more"
                        :id="'page-photo'"
                        :view="false"
                        :title="'Похожие фотографии'"
                />
            </div>
        </div>

    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import {MasonryLayout} from "@/modules";

    export default {
        name: "Photo",
        components: {
            MasonryLayout
        },
        data: () => ({
            loading: true,
            image: {},
            active: false,
            more: [],
        }),
        computed: {
            ...mapGetters({
                favorites: 'getFavorites',
            }),
        },
        methods: {
            async fetchPhoto() {
                try {
                    this.loading = true;
                    let response = await fetch(`https://api.unsplash.com/photos/${this.$route.params.id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Authorization": "Client-ID ImF-jEdFhgzN4EG1XLpbn9nnaXim7R0FQzygY4MuPqo"
                        }
                    });
                    if (response.status === 200) {
                        let data = await response.json();
                        this.image = data;
                        this.more = data.related_collections.results.map(item => item.cover_photo);
                        this.loading = false;
                    }
                    else {
                        this.loading = false;
                    }
                }
                catch (error) {
                    this.loading = false;
                    console.log(error)
                }
            },
            setFavoritesItem(){
                this.$store.commit("SET_FAVORITES_ITEM", this.image);
            },
            goBack(){
                this.$router.go(-1)
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
            this.fetchPhoto()
        },
        watch: {
            '$route.query.search': {
                handler: function() {
                    this.fetchPhoto()
                },
                deep: true,
                immediate: true
            }
        }
    };

</script>

<style lang="scss">

    .page-photo{
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow: auto;
        height: 100%;
        width: 100%;
    }

    .wrapper{
        width: 100%;
    }
    .filter{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 40px 0;
        background: rgba(40, 36, 22, 0.01);
        backdrop-filter: blur(8px);
    }

    .photo-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        max-width: 1170px;

        &__top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        &__bottom{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            span{
                font-size: 24px;
                padding: 40px 0 10px;
            }
            .tags{
                display: flex;
                align-self: center;
                justify-content: center;
                flex-wrap: wrap;
                &__item{
                    background: #FFFFFF;
                    border-radius: 8px;
                    font-size: 18px;
                    line-height: 21px;
                    color: #828282;
                    cursor: pointer;
                    padding: 5px 10px;
                    margin: 10px;
                    text-decoration: none;

                    &:hover{
                        color: #000000;
                    }
                }
            }
        }

        .user{
            display: flex;
            align-items: center;
            &__name{
                display: flex;
                flex-direction: column;
                align-self: center;
                font-size: 30px;
                line-height: 30px;
                color: #ffffff;
                margin-left: 10px;
                p{
                    margin: 0;
                }
                span{
                    font-size: 18px;
                }
            }
            img{
                height: 54px;
                width: 54px;
                border: 1px solid #FFFFFF;
                box-sizing: border-box;
                border-radius: 8px;
            }
        }

        .image {
            position: relative;
            img{
                width: 100%;
                border-radius: 8px;
                object-fit: contain;
                box-shadow: 0px 4px 100px #000000;

            }
            a{
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 30px;
                width: 30px;
                color: #ffffff;
                bottom: 60px;
                right: 100px;
                font-size: 25px;
                cursor: pointer;
                text-decoration: none;
                &:hover{
                    font-size: 30px;
                }
            }
        }

        .box-buttons{
            display: flex;
            color: #ffffff;

            .heartBtn{
                display: flex;
                align-self: center;
                justify-content: center;
                background: #FFFFFF;
                box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
                border-radius: 8px;
                color: #828282;
                font-size: 22px;
                cursor: pointer;
                height: 50px;
                width: 50px;
                box-sizing: border-box;
                padding-top: 13px;

                &.active{
                    color: red;
                }

                &:hover{
                    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
                }
            }

            button{
                display: flex;
                align-items: center;
                justify-content: center;
                background: #219653;
                border: 1px solid #219653;
                box-sizing: border-box;
                box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
                border-radius: 8px;
                outline: none;
                color: #ffffff;
                font-size: 20px;
                margin-left: 20px;
                cursor: pointer;
                width: 206px;
                height: 50px;

                p{
                    margin: 0;
                    padding-left: 20px;
                }
                &:hover{
                    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
                }
            }
        }
    }

    .photos-more{
        display: flex;
        flex-direction: column;
        background: #ffffff;
        width: 100%;
        margin-top: 80px;
        &__items{
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    }

    @media (max-width: 1300px) {

        .photo-box {
            max-width: 785px;
        }
    }

    @media (max-width: 900px) {
        .page-photo{

        }

        .photo-box {
            padding: 0 20px;

            .box-buttons{

                button{
                    width: 50px;

                    p{
                        display: none;
                    }
                }
            }
            .image {
                a {
                    bottom: 60px;
                    right: 60px;
                }
            }
        }

        .photos-more{
            margin-top: 30px;
        }
    }

    @media (max-width: 400px) {
        .page-photo{

        }

        .wrapper{
            background-image: none!important;
        }
        .filter{
            background: #ffffff;
            backdrop-filter: none!important;
        }

        .photo-box {
            padding: 0 5px;
            &__top{

            }

            &__bottom{
                align-items: baseline;
                color: #000000;
                span{

                }
                .tags{
                    justify-content: flex-start;

                    &__item{
                        background: #F2F2F2;
                        margin-left: 0;
                    }
                }
            }

            .user{

                &__name{
                    line-height: 18px;
                    p{
                        color: #000000;
                        font-size: 18px;
                    }
                    span{
                        color: #828282;
                        font-size: 12px;
                    }
                }

            }

            .image {
                img{
                    box-shadow: none;
                }

                a {
                    bottom: 30px;
                    right: 30px;
                }
            }
        }
    }

</style>
