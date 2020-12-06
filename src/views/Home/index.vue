<template>
    <div class="home">
        <EmptyState v-if="!images.length" :text="'Ничего не найдено'" />
        <div id="page-home" class="home__items" v-infinite-scroll="getPhotos" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <MasonryLayout
                    :id="'page-home'"
                    v-show="images.length"
                    :images="images"
                    :view="true"
            />
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex';
    import {MasonryLayout} from "@/modules";
    import {EmptyState} from "@/components";

    export default {
        name: "Home",
        components: {
            MasonryLayout,
            EmptyState,
        },
        data: () => ({
            images: [],
            busy: false,
            count: 0,
            isLoading: false,
        }),
        computed: {
            ...mapGetters({
            }),
        },
        methods: {
            ...mapActions({

            }),
            async fetchPhotos() {
                try {
                    this.isLoading = true;
                    let response = await fetch(`https://api.unsplash.com/photos?page=${this.count}&per_page=10&order_by=latest`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Authorization": "Client-ID ImF-jEdFhgzN4EG1XLpbn9nnaXim7R0FQzygY4MuPqo"
                        }
                    });
                    if (response.status === 200) {
                        let data = await response.json();
                        this.images = this.images.concat(data);
                        this.count++;
                        if(!data.length){
                            this.busy = true
                        }
                    }
                    this.isLoading = false;
                }
                catch (error) {
                    this.isLoading = false;
                    console.log(error)
                }
            },
            async fetchSearch() {
                try {
                    this.isLoading = true;
                    let response = await fetch(`https://api.unsplash.com/search/photos?query=${this.$route.query.search}&per_page=10&orientation=portrait&color=green&page=${this.count}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Authorization": "Client-ID ImF-jEdFhgzN4EG1XLpbn9nnaXim7R0FQzygY4MuPqo"
                        }
                    });
                    if (response.status === 200) {
                        let data = await response.json();
                        this.images = this.images.concat(data.results);
                        this.count++;
                        if (!data.results.length) {
                            this.busy = true
                        }
                    }
                    this.isLoading = false;
                }
                catch (error) {
                    this.isLoading = false;
                    console.log(error)
                }
            },
            getPhotos() {
                if(!this.isLoading){
                    if (this.$route.query.search) {
                        this.fetchSearch();
                    } else {
                        this.fetchPhotos();
                    }
                }
            }
        },
        watch: {
            '$route.query.search': {
                handler: function() {
                    this.count = 1;
                    this.images = [];
                    this.getPhotos();
                },
                deep: true,
                immediate: true
            }
        }
    };
</script>


<style lang="scss">

    .home{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        overflow: auto;
        &__items{
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            width: 100%;
            overflow: auto;
        }
    }

</style>