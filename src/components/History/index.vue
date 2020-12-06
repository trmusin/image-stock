<template>
    <div class="history">
        <span class="history__title">Ваши запросы</span>
        <div class="history__links">
            <span v-if="!history.length">Список пуст</span>
            <span
                    v-for="(item, index) in history"
                    :key="index"
                    @click="onSearch(item)"
            >
                {{item}}
            </span>
        </div>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name: "History",
        props: {
            setCurrentTab: Function,
            onSearch: Function
        },
        computed: {
            ...mapGetters({
                history: 'getHistory',
            }),
        },
    };
</script>

<style scoped lang="scss">

    .history{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #ffffff;
        margin: 60px 0 100px;

        &__title{
            font-size: 36px;
            line-height: 43px;
            margin-bottom: 15px;
        }

        &__links{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            overflow: auto;
            width: 100%;
            font-size: 18px;
            line-height: 40px;
            white-space: normal;
            box-sizing: border-box;
            span{
                margin: 0 10px;
                color: #ffffff;
                text-decoration: none;
                cursor: pointer;
            }
        }
    }

    @media (max-width: 420px) {
        .history{
            height: calc(100vh - 80px);
        }
    }

</style>
