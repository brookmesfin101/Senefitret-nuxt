<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Article Management</h3>
                <p class="mb-0">Senefitret > Admin > Articles</p>
            </div>            
        </div>
        <div class="dashboard bg-white ml-4">
            <div class="row">
                <div class="col-8">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col"><strong>Name</strong> of Article</th>
                            <th scope="col"><strong>Type</strong> of Article</th>
                            <th scope="col"><strong>View</strong> Article</th>
                            <th scope="col">File Extension</th>
                            </tr>
                        </thead>
                        <tr v-for="pdf in pdfs" :key="pdf.id">
                            <th scope="row"><font-awesome-icon :icon="['fas', 'file-pdf']" class="fa-fw"/></th>
                            <td v-text="pdf.name">Column content</td>
                            <td v-text="pdf.type">Column content</td>                            
                            <td><button type="button" @click="ViewArticle(pdf)" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#ArticleModal">View</button></td>
                            <td v-text="pdf.ext">Column content</td>
                        </tr>
                    </table>                    
                </div>
            </div>                    
        </div>

        <div class="modal fade" id="ArticleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{article.name}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-show="article && article.ext == 'pdf'">
                        <LazyPDFDocument :url="'/pdfs/' + article.name" :scale="1" :key="article.name"/>
                    </div>
                    <div v-show="article && article.ext == 'md'">
                        <nuxt-content :document="article.content"/>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                    
                </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    layout: 'admin',
    data(){
        return {
            pdfs : [],
            article : {
                ext: '',
                name: '',
                content: ''
            }
        }
    },
    methods: {
        ListFiles(){
            this.$axios.get('api/list-pdfs')
                .then((pdfs) => {                    
                    this.pdfs = pdfs.data;
                })
                .catch(err => console.log(err));
        },
        async ViewArticle(article){
            this.article.name = article.name + '.' + article.ext;   
            this.article.ext = article.ext;     

            if(article.ext == 'md'){
                this.article.content = await this.$content(`manuscripts/${article.name}`).fetch();                
            } else {

            }
               
            $('#exampleModal').modal('show');
        }
    },
    mounted(){
        this.ListFiles();
    }
}
</script>

<style>
    .dashboard {
        height: 500px;
        width: 95%;
        position: relative;
        top: -40px;
        border-radius: 3px;
        box-shadow: 0px 0px 9px 1px #e6e6e6
    }
</style>