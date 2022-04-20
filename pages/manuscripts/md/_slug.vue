<template>
    <article class="pr-5">
        <nuxt-content :document="article"></nuxt-content>
    </article>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const article = await $content('manuscripts', params.slug).fetch();

        return { article }
    }
}
</script>

<style scoped>

</style>
