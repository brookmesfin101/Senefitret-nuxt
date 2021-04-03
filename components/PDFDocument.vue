<template>
    <div class="pdf-document">    
        <div v-if="currentPage != null" class="row mb-4">
            <div class="col-8">
                <button @click="onPrevPage" class="btn mr-4" :class="[pageNum == 1 ? 'btn-secondary' : 'btn-primary']" :disabled="pageNum == 1">Previous</button>    
                <p class="lead d-inline mr-4">{{pageNum + ' / ' + pdf.numPages}}</p>
                <button @click="onNextPage" class="btn btn-primary" :class="[pageNum >= pdf.numPages ? 'btn-secondary' : 'btn-primary']" :disabled="pageNum >= pdf.numPages">Next</button>    
            </div>                    
        </div>
        <div class="row">
            <div v-if="currentPage != null" class="col-8"> 
                <PDFPage                    
                    v-bind="{page: currentPage, scale}"
                    :key="pageNum"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import * as pdfjs from 'pdfjs-dist/webpack';    
    import range from 'lodash/range';    

    export default {
        props: ['url', 'scale'],
        data() {
            return {
                pdf: undefined,
                pages: [],
                pageNum: 1,
                pageRendering: false,
                currentPage: undefined,
                pageNumPending: null
            }
        },
        watch: {
            async pdf(pdf){                
                this.pages = [];
                const promises = range(1, pdf.numPages + 1).
                    map(number => pdf.getPage(number));
                console.log(promises);

                Promise.all(promises).
                    then((pages) => {
                        this.pages = pages;                        
                        this.currentPage = this.pages[0];
                        this.pageNum = 1;
                    });
            }     
        },
        methods: {
            pageCount() {
                return this.pdf ? this.pdf.numPages : 0;
            },                        
            onNextPage() {                    
                if (this.pageNum >= this.pdf.numPages) {
                    return;
                }                
                this.pageNum++;          
                this.currentPage = this.pages[this.pageNum - 1];                                
            },
            onPrevPage() {                
                if (this.pageNum <= 1) {
                    return;
                }                                
                this.pageNum--;                
                
                this.currentPage = this.pages[this.pageNum - 1];                                
            }
        },
        async mounted(){
            console.log(this.url);
            pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/es5/build/pdf.worker.min.js';  
            
            this.pdf = await pdfjs.getDocument(this.url).promise;              
        }
    }
</script>

<style scoped>
</style>