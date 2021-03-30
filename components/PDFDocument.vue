<template>
    <div class="pdf-document">
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
    import throttle from 'lodash/throttle';

    export default {
        props: ['url', 'scale'],
        data() {
            return {
                pdf: undefined,
                pages: [],
                scrollTop: 0,
                clientHeight: 0,
                didReachBottom: false,
            }
        },
        watch: {
            async pdf(pdf){                
                this.pages = [];
                this.fetchPages();
            },
            didReachBottom(didReachBottom) {
                if (didReachBottom) this.fetchPages();
            },      
        },
        methods: {
            pageCount() {
                return this.pdf ? this.pdf.numPages : 0;
            },
            fetchPages() {
                if (!this.pdf) return;

                const currentCount = this.pages.length;
                if (this.pageCount > 0 && currentCount === this.pageCount) return;
                if (this.cursor > currentCount) return;

                const startPage = currentCount + 1; // PDF page numbering starts at 1
                const endPage = Math.min(currentCount + BATCH_COUNT, this.pageCount);
                this.cursor = endPage;

                getPages(this.pdf, startPage, endPage)
                    .then((pages) => {
                    this.pages.splice(currentCount, 0, ...pages);
                    return this.pages;
                    })
                    .catch((response) => {
                    this.$emit('document-errored');
                    });
            },
            isBottomVisible() {
                const {scrollTop, clientHeight, scrollHeight} = this.$el;
                return scrollTop + clientHeight >= scrollHeight;
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
            updateScrollBounds() {
                const {scrollTop, clientHeight} = this.$el;
                this.scrollTop = scrollTop;
                this.clientHeight = clientHeight;
                this.didReachBottom = this.isBottomVisible();
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
        beforeDestroy() {
            window.removeEventListener('resize', this.throttledOnResize, true);
        },
        async mounted(){
            pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/es5/build/pdf.worker.min.js';  
            this.updateScrollBounds();
            
            this.pdf = await pdfjs.getDocument("/pdfs/Ethiopian Flora Project.pdf").promise;      
            
            this.updateScrollBounds();
            const throttledCallback = throttle(this.updateScrollBounds, 300);

            this.$el.addEventListener('scroll', throttledCallback, true);
            window.addEventListener('resize', throttledCallback, true);

            this.throttledOnResize = throttledCallback;
        }
    }
</script>

<style scoped>
    .pdf-document {
    position: absolute;
    overflow: auto;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    }
</style>