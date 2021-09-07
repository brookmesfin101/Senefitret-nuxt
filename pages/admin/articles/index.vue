<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Article Management</h3>
                <p class="mb-0">Senefitret > Admin > Articles</p>
            </div>            
        </div>
        <div class="dashboard bg-white ml-4">
            <div class="form-inline pt-3 pb-3 pl-3">
                <label for="exampleInputEmail1" class='mr-3'>Type of article</label>
                <select @change="listFilesAsync()" v-model='viewArticleType' name='ArticleType' class="form-control">
                    <option value='manuscripts'>Manuscripts</option>
                    <option value='biologicalsciences'>Biological Sciences</option>
                    <option value='sciencesociety'>Science and Society</option>
                    <option value='history'>History</option>
                    <option value='culture'>Culture</option>
                    <option value='religionscience'>Religion and Science</option>                
                </select>
            </div>

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
                                <th scope="col">Edit/Delete</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            <tr v-for="pdf in pdfs" :key="pdf.id">
                                <th scope="row"><font-awesome-icon :icon="['fas', 'file-pdf']" class="fa-fw"/></th>
                                <td v-text="pdf.title">Column content</td>
                                <td v-text="'manuscript'">Column content</td>                            
                                <td><button type="button" @click="viewArticle(pdf)" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#ArticleModal">View</button></td>
                                <td v-text="pdf.format">Column content</td>
                                <td>
                                    <span class='edit' @click='editArticle(pdf)' data-toggle="modal" data-target="#EditModal"><font-awesome-icon :icon="['fas', 'edit']"/></span>
                                    <span class='pl-1 pr-1'><strong>|</strong></span>
                                    <span class='delete' @click='deleteArticle(pdf)'><font-awesome-icon :icon="['fas', 'trash-alt']"/></span>
                                </td>
                            </tr>
                        </tbody>                        
                    </table>                    
                </div>
            </div>                    
        </div>

        <!-- Articles Modal -->
        <div class="modal fade" id="ArticleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{currentArticle.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="currentArticle && currentArticle.format == 'pdf'">
                            <PDFDocument :url="getPDFUrl()" :scale="1" :key="currentArticle.title"/>
                        </div>
                        <div v-show="currentArticle && currentArticle.format == 'md'">
                            <nuxt-content :document="currentArticle.content"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                    
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{currentArticle.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        
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
            currentArticle : {                
                title: '',
                content: '',
                format: '',
                filePath: '',
                thumbnailPath: '',
                subtitle: '',
                id: ''
            },
            viewArticleType: 'manuscripts'
        }
    },
    methods: {
        getPDFUrl(){
            return this.currentArticle.filePath.replace('./static', '');
        },
        listFilesAsync(){            
            this.$fire.firestore.collection(this.viewArticleType).get()
                .then((querySnapshot) => {
                    this.pdfs = [];
                    querySnapshot.forEach((doc) => {  
                        if(doc.data().test === void 0){
                            this.pdfs.push(doc.data());                        
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteArticle(pdf){
            console.log(pdf.id);
        },
        editArticle(pdf){
            $('#exampleModal').modal('hide');
        },
        async viewArticle(file){                      
            this.currentArticle.title = file.title;   
            this.currentArticle.filePath = file.filePath;       
            this.currentArticle.format = file.format;           
            this.currentArticle.id = file.id;      
            
            if(file.format == 'md'){
                const ext = '.' + file.format;
                const contentPath = file.filePath.replace(ext, '');
                this.currentArticle.content = await this.$content(contentPath).fetch();                
            }
        }
    },
    mounted(){        
        this.listFilesAsync();
    }
}
</script>

<style>
    .dashboard {        
        width: 95%;
        position: relative;
        top: -40px;
        border-radius: 3px;
        box-shadow: 0px 0px 9px 1px #e6e6e6
    }
    .edit:hover, .delete:hover {
        opacity: .5;
        cursor: pointer;
    }
</style>