<template>
    <div class="pdf-document">    
        <button class="btn btn-primary">Next</button>
        <button class="btn btn-primary">Previous</button>    
        <PDFPage
            v-for="page in pages"
            v-bind="{page, scale}"
            :key="page.pageNumber"
        />
    </div>
</template>

<script>
    import * as pdfjs from 'pdfjs-dist/webpack';    
    import range from 'lodash/range';    
    const BATCH_COUNT = 10;

    function getPages(pdf, first, last) {
        const allPages = range(first, last+1).map(number => pdf.getPage(number));
        return Promise.all(allPages);
    }

    export default {
        props: ['url', 'scale'],
        data() {
            return {
                pdf: undefined,
                pages: []
            }
        },
        watch: {
            async pdf(pdf){                
                this.pages = [];
                const promises = range(1, pdf.numPages).
                    map(number => pdf.getPage(number));

                Promise.all(promises).
                    then(pages => (this.pages = pages));
            }     
        },
        methods: {
            pageCount() {
                return this.pdf ? this.pdf.numPages : 0;
            },                        
            renderPDF(page) {
                var scale = 1.5;
                var viewport = page.getViewport({ scale: scale, });

                var canvas = document.getElementById('pdf-canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
            },
            async getPDFDocTask(){
                pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/es5/build/pdf.worker.min.js';  

                const task = await pdfjs.getDocument("Ethiopian Flora Project.pdf");

                task.promise.then((pdf) => {
                    return pdf;
                });
            }
        },
        async created(){                                                
    
        },
        async mounted(){
            pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/es5/build/pdf.worker.min.js';  
            
            this.pdf = await pdfjs.getDocument("/pdfs/Ethiopian Flora Project.pdf").promise;              
        }
    }
</script>

<style scoped>
</style>