<template>
    <div class="container-masonry" id="masonryContainer">
        <div class="container-masonry__view" v-if="view" >
            <template v-if="grid">
                <img src="@/assets/row-gray.svg" @click="setGrid"/>
                <img src="@/assets/grid-black.svg"/>
            </template>
            <template v-else>
                <img src="@/assets/row-black.svg" />
                <img src="@/assets/grid-gray.svg" @click="setGrid" />
            </template>
        </div>
        <div    v-if="images.length"
                class="container-masonry__items"
                :class="[!grid && 'mobile']"
        >
            <span class="container-masonry__title" v-if="title">{{title}}</span>
            <div :key="componentKey" v-masonry transition-duration="0.3s" item-selector=".item">
                <PhotoCard
                        v-masonry-tile
                        class="item"
                        v-for="(item, index) in images" :key="index"
                        :image="item"
                />
            </div>
            <div v-if="images.length" class="bnt-scroll" @click="onTop">
                <i class="ri-arrow-up-line"></i>
            </div>
        </div>
    </div>
</template>

<script>

    import {PhotoCard} from "@/components";

    export default {
        name: "MasonryLayout",
        components: {
            PhotoCard,
        },
        props: {
            images: Array,
            id: String,
            view: Boolean,
            title: String,
        },
        data: () => ({
            grid: true,
            componentKey: 1,
        }),
        methods:{
            onTop(){
                let elem = document.getElementById(this.id);
                elem.scrollTop = "0";
            },
            setGrid(){
                this.grid = !this.grid;
                this.componentKey += 1;
            },
        },
        mounted() {
            if (typeof this.$redrawVueMasonry === 'function') {
                this.$redrawVueMasonry()
            }
        },
        watch: {
            images: {
                handler: function() {
                    if (typeof this.$redrawVueMasonry === 'function') {
                        this.$redrawVueMasonry()
                    }
                },
                deep: true,
                immediate: true
            },
        }
    };
</script>

<style lang="scss">
    .container-masonry{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        &__view{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 66px;
            height: 23px;
            margin: 70px 0 40px;
            img{
                cursor: pointer;
            }
        }

        &__items{
            width: 100%;
            height: 100%;
            max-width: 1170px;
            .bnt-scroll{
                position: sticky;
                bottom: 30px;
                float: right;
                margin-right: 15px;
                width: 48.53px;
                height: 48.53px;
                background: #FFFFFF;
                color: #000000;
                font-size: 24px;
                box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
                border-radius: 8px;
                cursor: pointer;
                box-sizing: border-box;
                padding: 12px;
                &:hover{
                    background: #F2F2F2;
                    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
                }
            }

            &.mobile{
                max-width: 390px;
            }
        }
        &__title{
            display: block;
            color: #000000;
            font-size: 36px;
            margin: 0 0 40px 5px;
        }
    }

    @media (max-width: 1300px) {
        .container-masonry{

            &__items{
                max-width: 785px;
            }
        }
    }

    @media (max-width: 900px) {
        .container-masonry{
                padding: 0;
            &__view{
                margin: 40px 0 40px;
            }

            &__items{
                max-width: 390px;
            }
            &__title{
                font-size: 18px;
                margin-bottom: 25px;
            }
        }
    }

</style>