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
                        <div class='form-group'>
                            <label class='lead' for='ArticleTitle'>Title of Article</label>
                            <input type='text' name='ArticleTitle' v-model='currentArticle.title' class='form-control mt- w-50'>
                        </div>
                        <div class='form-group'>
                            <label class='lead' for='ArticleSubtitle'>Subtitle of Article</label>
                            <input type='text' name='ArticleSubtitle' v-model='currentArticle.subtitle' class='form-control mt- w-100'>
                        </div>
                        <div class='form-group'>
                        <label class='pr-4 lead'>Article Image Thumbnail</label>
                            <p>Image file must be a PNG, JPG, JPEG or GIF format</p>
                            <input class="form-control mt-1 w-50" type="file" ref="image" id="image" v-on:change="handleImageUpload()">     
                        </div>
                        <div id='Thumbnail_Preview' class='mt-4'>
                            <img :src='thumbailPath'>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click='updateArticle'>Save</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click='closeEditModal'>Close</button>                    
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
                type: '',
                id: '',
                tempImageFile: null,
                tempImageExt: '',
                tempImagePath: ''
            },
            viewArticleType: 'manuscripts'            
        }
    },
    computed: {
        thumbailPath(){
            return this.currentArticle.tempImagePath || this.currentArticle.thumbnailPath;
        }
    },
    methods: {
        closeEditModal(){
            this.currentArticle.tempImageFile = null;
            this.currentArticle.tempImagePath = '';
            this.currentArticle.tempImageExt = '';
        },
        updateArticle(){
            if(this.currentArticle.tempImagePath){
                this.updateImage();
            }
        },
        updateImage(){
            let formData = new FormData();    
            const renamedImageFile = this.renameImageBeforeSaving();

            formData.append('thumbnail', renamedImageFile);

            this.$axios.post('api/delete/image', { thumbnailPath: this.currentArticle.thumbnailPath })
                .then((res) => {
                    console.log(res);

                    return this.$axios.post(`api/upload/image/${this.viewArticleType}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });                    
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log('Error during image replacement: ', err);
                });
        },
        getPDFUrl(){
            return this.currentArticle.filePath.replace('./static', '');
        },
        handleImageUpload(){
          this.currentArticle.tempImageFile = this.$refs.image.files[0];
            
          var reader = new FileReader();
          reader.onload = (e) => {              
            this.currentArticle.tempImagePath = e.target.result;
          }          
          reader.readAsDataURL(this.currentArticle.tempImageFile);
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
            this.currentArticle.title = pdf.title;
            this.currentArticle.subtitle = pdf.subtitle;
            this.currentArticle.thumbnailPath = pdf.thumbnailPath;
            this.currentArticle.id = pdf.id;
            this.currentArticle.type = this.viewArticleType;
            
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
        },
        renameImageBeforeSaving(){
            if(this.currentArticle.tempImageFile){
                var image = this.currentArticle.tempImageFile;
                this.currentArticle.tempImageExt = this.currentArticle.tempImageFile.type.replace('image/', '');
                var ext = '.' + this.currentArticle.tempImageFile.type.replace('image/', '');            

                var newName = String(image.name).toLowerCase()
                                    .replace(ext,'')
                                    .concat('_', new Date().getTime().toString(), ext)
                                    .replace(' ', '');                                                       

                var blob = image.slice(0, image.size, image.type);
                var newFile = new File([blob], newName, {type: image.type});
            }
            
            return newFile || undefined;
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
    #Thumbnail_Preview > img {
        width: 35%;
    }
</style>