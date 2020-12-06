<template>
    <div class="favorites" id="page-favorites">
        <template v-if="images.length">
            <span class="favorites__title">Избранное</span>
            <div class="favorites__items">
                <MasonryLayout
                        :id="'page-favorites'"
                        :images="images"
                        :view="true"

                />
            </div>
        </template>
        <EmptyState v-else :text="'Список избранного пуст'" />
    </div>
</template>

<script>

    import {mapState, mapGetters, mapActions} from 'vuex';
    import {MasonryLayout} from "@/modules";
    import {EmptyState} from "@/components";

    export default {
        name: "Favorites",
        components: {
            MasonryLayout,
            EmptyState,
        },
        computed: {
            ...mapState({
                favorites: state => state.favorites,
            }),
            images() {
                return Object.values(this.favorites).sort(function (a, b) {
                    return new Date(b.createDate) - new Date(a.createDate);
                });
            }
        },
        methods: {
            ...mapActions({}),
        },
        mounted() {
            if (typeof this.$redrawVueMasonry === 'function') {
                this.$redrawVueMasonry()
            }
        },
        watch: {
            images: {
                handler: function () {
                    if (typeof this.$redrawVueMasonry === 'function') {
                        this.$redrawVueMasonry()
                    }
                },
                deep: true,
                immediate: true
            }
        }
    };
</script>

<style lang="scss">

    .favorites {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        &__title {
            font-size: 72px;
            color: #000000;
            margin-top: 100px;
        }
        &__items {
            display: flex;
            justify-content: center;
            height: 100%;
            width: 100%;
        }

    }

    @media (max-width: 900px) {
        .favorites {

            &__title {
                font-size: 36px;
                color: #000000;
                margin-top: 40px;
            }
            &__items {
                width: 100%;
            }

        }
    }

</style>
