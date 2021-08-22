<template>
    <article class="mt-2">
        <PDFDocument :url="url" :scale="2"/>
    </article>
</template>

<script>
export default {
    async asyncData({ $content, params }) {               
        const url = `/pdfs/religionscience/${params.slug}.pdf`;        

        return { url }
    }
}
</script>

<style scoped>

</style>