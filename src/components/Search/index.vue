<template>
    <div class="search">
        <div class="search__field">
            <input
                    placeholder="Поиск"
                    v-model="search"
                    @keyup.enter="onChange"
            />
            <div class="border"></div>
        </div>

        <p class="search__links">
            <span @click="setSearch(item)"
                    v-for="(item, index) in history"
                    :key="index"
                    :to="`/?search=${item}`"
            >
                {{item}}
            </span>
        </p>

    </div>
</template>

<script>


    import { mapGetters } from 'vuex';

    export default {
        name: "Search",
        props: {
            setCurrentTab: Function,
            onSearch: Function,
        },
        data: () => ({
            search: '',
        }),
        computed: {
            ...mapGetters({
                history: 'getHistory',
            }),
        },
        methods: {
            setSearch(search){
              this.onSearch(search)
            },
            onChange() {
                if(this.search && this.$route.query.search!==this.search){
                    this.onSearch(this.search);
                    this.$store.commit("SET_HISTORY_ITEM", this.search)
                }
            }
        },
    };
</script>

<style scoped lang="scss">

    .search {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 15px 20px 90px;
        width: 100%;

        &__field {
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            width: 100%;
            max-width: 1200px;
            .border {
                height: 1px;
                width: 100%;
                background: rgba(255, 255, 255, 1);
                background-image: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 50%, #000000 100%);
            }

            input {
                padding: 0 20px;
                font-size: 72px;
                line-height: 86px;
                color: #FFFFFF;
                background: #000000;
                text-align: center;
                outline: none;
                border: none;
                &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                    color: #ffffff;
                }
                &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #ffffff;
                    opacity: 1;
                }
                &::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #ffffff;
                    opacity: 1;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                    color: #ffffff;
                }
                &::-ms-input-placeholder { /* Microsoft Edge */
                    color: #ffffff;
                }

                &::placeholder { /* Most modern browsers support this now. */
                    color: #ffffff;
                }
            }
        }

        &__links{
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            width: 100%;
            span{
                font-size: 18px;
                line-height: 21px;
                margin: 0 10px;
                font-weight: 500;
                color: #ffffff;
                cursor: pointer;
            }
        }
         p:after {
            content: '';
            background: -moz-linear-gradient(left,  rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
            background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
            background: linear-gradient(to right,  rgba(0,0,0,0) 0%,#000000 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0bf3f3', endColorstr='#fbfbfb',GradientType=1 ); /* IE6-9 */
            float: right;
            width: 200px;
            height: 29px;
            margin-top: -25px;
            position: relative;
        }

    }

    @media (max-width: 600px) {
        .search {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 15px 20px 50px;
            width: 100%;

            &__field {
                .border {

                }

                input {
                    font-size: 36px;
                    line-height: 43px;
                }
            }

            &__links{

                span{

                }
            }
            p:after {
                width: 100px;
            }

        }
    }

</style>
