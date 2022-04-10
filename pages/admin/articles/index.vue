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
                    <option v-if='isDevEnvironment' value='test'>Test</option>
                    <option value='biologicalsciences'>Biological Sciences</option>
                    <option value='sciencesociety'>Science and Society</option>
                    <option value='history'>History</option>
                    <option value='culture'>Culture</option>
                    <option value='religionscience'>Religion and Science</option>                
                </select>
            </div>

            <div class="row">
                <div class="col-9">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" style='width: 45%'><strong>Name</strong> of Article</th>
                                <th scope="col" style='width: 15%'><strong>Type</strong> of Article</th>
                                <th scope="col" style='width: 13%'><strong>View</strong> Article</th>
                                <th scope="col" style='width: 13%'>File Extension</th>
                                <th scope="col" style='width: 13%'>Edit/Delete</th>
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
                                    <span class='delete' @click='deleteConfirmation(pdf)'><font-awesome-icon :icon="['fas', 'trash-alt']"/></span>
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>                    
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div class='modal fade' id='DeleteModal' tabindex="-1" role='dialog' aria-labeledby='deleteModalLabel' aria-hidden='true'>
            <div class='modal-dialog modal-lg' role='document'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>If you truly wish to delete the <em>({{currentArticle.title}})</em> article, please click the <strong>DELETE</strong> button otherwise click <strong>CANCEL</strong>.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click='deleteArticle'>Delete</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click='closeDeleteModal'>Cancel</button>                    
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
                        <transition name="upload">
                            <div v-show="showConfirmationComputed" class="alert alert-success w-50 pt-4">                
                                <p class='lead'>Article has been successfully updated.</p>
                            </div>
                        </transition>  
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click='closeEditModal'>Cancel</button>                    
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
                showConfirmation: false,
                currentArticle : {    
                    name: '',            
                    title: '',
                    originalTitle: '',
                    content: '',
                    format: '',
                    filePath: '',
                    thumbnailPath: '',
                    subtitle: '',
                    originalSubtitle: '',
                    type: '',
                    id: '',
                    tempImageFile: null,
                    tempImageExt: '',
                    tempImagePath: ''
                },
                currentArticleFormat: '',
                viewArticleType: 'manuscripts'            
            }
        },
        computed: {
            showConfirmationComputed: {
                get(){
                    return this.showConfirmation;
                },
                set(val){
                    this.showConfirmation = val;
                }
            },
            thumbailPath(){
                return this.currentArticle.tempImagePath || this.currentArticle.thumbnailPath;
            },
            isDevEnvironment(){
                return process.env.DEV;
            }
        },
        methods: {
            closeEditModal(){
                this.currentArticle.tempImageFile = null;
                this.currentArticle.tempImagePath = '';
                this.currentArticle.tempImageExt = '';
                this.currentArticle.originalTitle = '';
                this.currentArticle.originalSubtitle = '';                                
            },
            closeDeleteModal(){
                this.currentArticle.tempImageFile = null;
                this.currentArticle.tempImagePath = '';
                this.currentArticle.tempImageExt = '';
                this.currentArticle.originalTitle = '';
                this.currentArticle.originalSubtitle = '';
            },
            editArticle(pdf){
                this.currentArticle.name = pdf.name;
                this.currentArticle.title = pdf.title;
                this.currentArticle.subtitle = pdf.subtitle;
                this.currentArticle.thumbnailPath = pdf.thumbnailPath;
                this.currentArticle.id = pdf.id;
                this.currentArticle.filePath = pdf.filePath;
                this.currentArticle.originalTitle = pdf.title;
                this.currentArticle.originalSubtitle = pdf.subtitle;

                this.currentArticle.type = this.viewArticleType;
                
                $('#DeleteModal').modal('hide');
                $('#ArticleModal').modal('hide');
            },            
            // hide other modals and show delete confirmation window
            deleteConfirmation(pdf){
                $('#EditModal').modal('hide');
                $('#ArticleModal').modal('hide');
                
                $('#DeleteModal').modal('show');

                this.currentArticle.name = pdf.name;
                this.currentArticle.title = pdf.title;
                this.currentArticle.subtitle = pdf.subtitle;
                this.currentArticle.thumbnailPath = pdf.thumbnailPath;
                this.currentArticle.id = pdf.id;
                this.currentArticle.filePath = pdf.filePath;      
                this.currentArticleFormat = pdf.format;          
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
            // begin article update process and then show confirmation alert if article was updated
            updateArticle(){
                if(this.currentArticle.tempImagePath){
                    this.updateImage();                                        
                } else if (this.currentArticle.originalSubtitle !== this.currentArticle.subtitle || this.currentArticle.originalTitle !== this.currentArticle.title) {
                    this.updateTitles();
                    this.showConfirmationComputed = true;
                }
                setTimeout(() => {
                    this.showConfirmationComputed = false;
                }, 4000);
            },
            // update artilce title and/or subtitle in firestore and then update pdf array
            updateTitles() {
                var fileName = this.currentArticle.filePath.replace(`/pdf/${this.viewArticleType}/`, '');

                this.$fire.firestore.collection(this.viewArticleType).doc(fileName).update({
                    title: this.currentArticle.title,
                    subtitle: this.currentArticle.subtitle
                })
                .then((res) => {
                    setTimeout(() => {
                        this.showConfirmationComputed = false;
                    }, 4000);
                    this.listFilesAsync();
                })
                .catch((err) => {
                    console.log(err);
                });
            },
            // renames newly uploaded image -> deletes old image -> uploads new image -> pushes naming and image changes to firestore
            updateImage(){
                let formData = new FormData();    
                const renamedImageFile = this.renameImageBeforeSaving();

                formData.append('thumbnail', renamedImageFile);

                this.$axios.post('api/delete/image', { thumbnailPath: this.currentArticle.thumbnailPath })
                    .then(() => {
                        return this.$axios.post(`api/upload/image/${this.viewArticleType}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });                    
                    })
                    .then(() => {
                        this.currentArticle.thumbnailPath = `/images/${this.viewArticleType}/${renamedImageFile.name}`;     
                        
                        this.pushArticleChanges();
                    })
                    .catch((err) => {
                        console.log('Error during image replacement: ', err);
                    });
            },
            // perform multiple step article deletion process
            deleteArticle(){
                this.showLoadingIcon();

                this.deleteImage().then(() => {      
                    if(this.currentArticleFormat === 'pdf'){                        
                        return this.deletePDF();                        
                    }          
                })
                .then(() => {
                    return this.pushArticleDeletion();
                })
                .then(() => {
                    this.listFilesAsync();
                    this.hideLoadingIcon();
                    $('#DeleteModal').modal('hide');
                })
                .catch((err) => {
                    console.log('Error during article deletion: ', err);
                });                                         
            },
            // delete article from firestore database
            pushArticleDeletion(){
                return this.$fire.firestore.collection(this.viewArticleType).doc(this.currentArticle.name).delete();
            },
            // delete image from file system
            deleteImage(){
                return this.$axios.post('api/delete/image', { thumbnailPath: this.currentArticle.thumbnailPath });
            },
            // delete pdf from file system
            deletePDF(){
                var path = this.currentArticle.filePath;

                if (!String(path).includes('./static/')){
                    path = `./static/${path}`;
                    if(!String(path).includes('pdfs')){
                        path = String(path).replace('pdf', 'pdfs');
                    }
                }
            
                return this.$axios.post('api/delete/pdf', { filePath: path });
            },
            // format pdf url
            getPDFUrl(){
                return this.currentArticle.filePath.replace('./static', '').replace('/pdf/', '/pdfs/');
            },
            // update temporary image path and show new image on screen
            handleImageUpload(){
                this.currentArticle.tempImageFile = this.$refs.image.files[0];                
                    
                var reader = new FileReader();
                reader.onload = (e) => {              
                    this.currentArticle.tempImagePath = e.target.result;
                }          
                reader.readAsDataURL(this.currentArticle.tempImageFile);
            },
            // Push article changes to firestore
            pushArticleChanges(){
                this.showLoadingIcon();
                var fileName = this.currentArticle.filePath.replace(`/pdf/${this.viewArticleType}/`, '');

                this.$fire.firestore.collection(this.viewArticleType).doc(fileName).update({
                    title: this.currentArticle.title,
                    subtitle: this.currentArticle.subtitle,
                    thumbnailPath: this.currentArticle.thumbnailPath
                })
                .then((res) => {
                    
                    var confirmation = () => {
                        this.showConfirmationComputed = true;
                        
                        setTimeout(() => {
                            this.showConfirmationComputed = false;
                        }, 3000);
                    };

                    this.hideLoadingIcon(confirmation);
                    
                    this.listFilesAsync();
                })
                .catch((err) => {
                    console.log(err);
                });
            },
            // Grabs docs by article type from firestore
            listFilesAsync(){            
                this.$fire.firestore.collection(this.viewArticleType).get()
                    .then((querySnapshot) => {
                        this.pdfs = [];
                        querySnapshot.forEach((doc) => {  
                            if(doc.data().test === void 0){
                                const item = doc.data();
                                // Add doc id as an additional object property
                                item["name"] = doc.id;

                                this.pdfs.push(item);           
                            }
                        });

                        this.hideLoadingIcon();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            hideLoadingIcon(func = null){
                if(this.$store.getters.getLoadingStatus){
                    setTimeout(() => {
                        this.$store.commit('setLoadingStatus', false);
                        
                        if(func)
                            func();
                    }, 1000);
                }
            },
            showLoadingIcon(){
                this.$store.commit('setLoadingStatus', true);
            },               
            // date mark image and create new file from it   
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
        },
        created(){
            this.showLoadingIcon();
        }
    }
</script>

<style scoped>
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
    .upload-enter-active, .upload-leave-active {
        transition: opacity .5s;
    }
    .upload-enter, .upload-leave-to {
        opacity: 0;
    }
    .alert.alert-success {
        position: absolute;
        left: 200px;
    }
</style>