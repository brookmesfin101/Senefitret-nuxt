<template>
    <article class="">
        <nuxt-content :document="article"></nuxt-content>
    </article>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const article = await $content('history', params.slug).fetch();

        return { article }
    }
}
</script>

<style scoped>

</style>
