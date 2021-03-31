<template>
    <article>
        <PDFDocument :url="url" :scale="2"/>
    </article>
</template>

<script>
export default {
    async asyncData({ $content, params }) {           
        const url = `static/pdfs/${params.slug}.pdf`;

        return { url }
    }
}
</script>

<style scoped>
article {
    height: 50vh;
    margin-top: 50px;
}
</style>