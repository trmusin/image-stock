<template>
    <div class="header" id="header">
        <div class="header__navigation">
            <div class="logo">
                <img src="@/assets/logo.svg" alt="logo"/>
                <span>ImageStock</span>
            </div>

            <div class="tabs">
                <Tab
                    v-for="(item, index) in tabs" :key="index"
                    :item="item"
                    :active="currentTab===item.id"
                    :action="clickTab"
                />
            </div>
        </div>

        <Search
            v-if="currentTab===1"
            :setCurrentTab="setCurrentTab"
            :onSearch="onSearch"
        />
        <History
            v-if="currentTab===3"
            :setCurrentTab="setCurrentTab"
            :onSearch="onSearch"
        />

    </div>

</template>


<script>

    import { Tab, History, Search } from "@/components";

    export default {
        name: "Header",

        components:{
            Tab,
            History,
            Search,
        },
        props: {},
        data: ()=>({
            tabs:[
                {
                    id: 1,
                    name: "Поиск",
                    icon: "ri-search-2-line",
                },
                {
                    id: 2,
                    name: "Избранное",
                    icon: "ri-heart-fill",
                },
                {
                    id: 3,
                    name: "История поиска",
                    icon: "ri-history-fill",
                },
            ],
            currentTab: null,
        }),
        methods: {

            setCurrentTab(id){
                this.currentTab = id;
            },
            clickTab(item){
                this.setCurrentTab(item.id);
                if(item.id === 2){
                    this.$router.push({path: '/favorites'})
                }
            },
            onSearch(search) {
                this.setCurrentTab(null);
                if(this.$route.query.search!== search){
                    this.$router.push({path: '/', query: { search: search }});
                }
            },
            outsideClick(e) {
                if(document.getElementById("header")){
                    if (!document.getElementById("header").contains(e.target)) {
                        this.currentTab = null;
                    }
                }
            },
        },
        created() {
            document.addEventListener('click', this.outsideClick);
            this.$on('hook:beforeDestroy', () => document.removeEventListener('click', this.outsideClick));
        }
    }

</script>

<style scoped lang="scss">

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: max-content;
        color: #ffffff;
        box-sizing: border-box;
        max-width: 1170px;
        &__navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            height: 80px;
            width: 100%;

            .logo {
                display: flex;
                align-items: center;
                font-size: 24px;
                line-height: 29px;
                color: #FFFFFF;
                span {
                    margin-left: 24px;
                }
                img {
                    height: 28px;
                    width: 28px;
                    font-size: 10px;
                }
            }

            .tabs {
                display: flex;
                align-items: center;
                padding-top: 10px;
                margin-right: 15px;
            }
        }
    }

    @media (max-width: 1300px) {
        .header {
            max-width: 785px;

        }
    }

    @media (max-width: 900px) {
        .header {
            padding: 0 20px;
            &__navigation {

                .logo {

                    span {
                        display: none;
                    }
                    img {
                        height: 28px;
                        width: 28px;
                        font-size: 10px;
                    }
                }
            }
        }
    }

</style>
