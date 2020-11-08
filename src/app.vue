<style scoped>
    @media (max-width: 767px) {
        .main {
            margin-top: 50px;
        }
    }
    @media (min-width: 768px) {
        .main {
            margin-top: 100px;
        }
    }
</style>

<template>
    <div>
        <header-nav></header-nav>
        <router-view class="main"></router-view>
        <!-- <footer-bottom></footer-bottom> -->
        <BackTop></BackTop>
    </div>
</template>
<script>

    import HeaderNav from "./views/header-nav";
    // import FooterBottom from "./views/footer-bottom";

    export default {
        data () {
            return {}
        },
        components: {
            HeaderNav,
            // FooterBottom
        },
        computed: {

        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
