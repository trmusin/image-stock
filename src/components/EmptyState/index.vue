<template>
    <div class="empty">
        {{text}}
    </div>
</template>

<script>
    export default {
        name: "EmptyState",
        props: {
            text: String
        },
        data:()=>({

        }),
        methods: {

        },
    }

</script>


<style lang="scss">
    .empty{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 200px 20px;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.54);

    }

</style>