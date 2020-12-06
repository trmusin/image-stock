<template>

    <div class="tab">
        <div class="tab__item" @click.stop="action(item)">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
        </div>
        <div class="tab__line" :class="[active && 'active']"></div>
    </div>

</template>

<script>
    export default {
        name: "Tab",
        props: {
            item: Object,
            active: Boolean,
            action: Function,
        },
        data:()=>({

        }),
        methods: {

        },
    }

</script>

<style scoped lang="scss">
    .tab {
        display: flex;
        flex-direction: column;
        width: max-content;
        align-items: flex-end;
        font-size: 18px;
        line-height: 21px;
        color: #FFFFFF;
        cursor: pointer;
        margin-left: 20px;
        &__item{
            display: flex;
            align-items: center;
            i{
                font-size: 22px;
            }
            span{
                margin-left: 10px;
            }
        }
        &__line{
            width: 30px;
            height: 3px;
            background: #000000;
            margin-top: 7px;
            &.active{
                background: #ffffff;
            }
        }
    }

    @media (max-width: 600px) {
        .tab {
            &__item{
                span{
                    display: none;
                }
            }
            &__line{
                display: none;
            }
        }
    }


</style>
