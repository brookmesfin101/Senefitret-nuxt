<template>
    <div id='write_article'>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Write An Article</h3>
                <p class="mb-0">Senefitret > Admin > Articles > Write</p>
            </div>            
        </div>
        <div class='row no-gutters pl-3 pt-3'>
            <div class='col-5'>
                <transition name="upload">
                    <div v-show='showError' class='alert alert-danger lead text-center' v-text='errorText'>                        
                    </div>
                </transition>
                <transition name="upload">
                    <div v-show='showSuccess' class='alert alert-success lead text-center'>
                        Article successfully saved
                    </div>
                </transition>                                    
                <div class='form-group row no-gutters'>
                    <label class='col-form-label col-3'>Title of Article</label>
                    <input class='form-control col-9' type='text' v-model='upload.title'/>
                </div>
                <div class='form-group row no-gutters'>
                    <label class='col-form-label col-3'>Subtitle of Article</label>
                    <input class='form-control col-9' type='text' v-model='upload.subtitle'/>
                </div>
                <div class='form-group row no-gutters'>
                    <label class='col-form-label col-3' for='ArticleType'>Type of Article</label>
                    <select name='ArticleType' class='form-control col-9' v-model='upload.type'>
                        <option value='' hidden disabled>Choose...</option>                    
                        <option value='manuscripts'>Manuscript</option>
                        <option v-if='isDevEnvironment' value='test'>Test</option>
                        <option value='biologicalsciences'>Biological Sciences</option>
                        <option value='sciencesociety'>Science and Society</option>
                        <option value='history'>History</option>
                        <option value='culture'>Culture</option>
                        <option value='religionscience'>Religion and Science</option>                                            
                    </select>
                </div>
            </div>
            <div class='offset-1 col-3'>                
                <div class='form-group'>
                    <label class='pr-4 lead'>Upload Article Image Thumbnail</label>
                    <p>Image file must be a PNG, JPG, JPEG or GIF format</p>
                    <input class="form-control mt-1" type="file" ref="image" id="image" v-on:change="handleImageUpload()">     
                </div>                               
            </div>
            <div class='offset-1 col-2'>
                <div id='Thumbnail_Preview'>
                    <img :src='tempImagePath' class='w-50'>
                </div> 
            </div>
        </div>
        <div class="dashboard bg-white ml-4">
            <tip-tap @input='tiptapContent'></tip-tap>
        </div>   
        <button type='button' class='btn btn-primary mt-4 ml-4' @click='saveArticle'>Save Article</button>     
    </div>  
</template>

<script>
import TipTap from '../../../components/TipTap.vue';

export default {
    layout: 'admin',
    components: {
        TipTap
    },
    computed: {
        isDevEnvironment(){
            return process.env.DEV;
        }
    },
    data() {
        return {
            content: '',
            tempImagePath: '',
            showError: false,
            showSuccess: false,
            errorText: '',
            upload: {
                title: '',
                subtitle: '',
                type: '',
                articlePath: '',
                image: null,
                imageExt: '',
                thumbnailPath: '',
                filePath: '',
                renamedArticleName: ''
            }   
        }
    },
    methods: {
        tiptapContent(content){
            this.content = content;
        },
        handleImageUpload(){
            this.upload.image = this.$refs.image.files[0];
                
            var reader = new FileReader();
            reader.onload = (e) => {              
                this.tempImagePath = e.target.result;
            }          
            reader.readAsDataURL(this.upload.image);
        },
        uploadImage(){
            let formData = new FormData();    
            const renamedImage = this.renameImageBeforeSaving();
            this.upload.thumbnailPath = `/images/${this.upload.type}/${renamedImage.name}`;  

            console.log(this.upload.thumbnailPath);

            formData.append('thumbnail', renamedImage);

            return this.$axios.post(`api/upload/image/${this.upload.type}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        },
        renameImageBeforeSaving(){
          var image = this.upload.image;
          this.upload.imageExt = this.upload.image.type.replace('image/', '');
          var ext = '.' + this.upload.image.type.replace('image/', '');

          var newName = image.name.replace(ext,'').concat('_', new Date().getTime().toString(), ext).replace(' ', '');          

          var blob = image.slice(0, image.size, image.type);
          var newFile = new File([blob], newName, {type: image.type});

          return newFile;
        },
        saveArticle(){
            if(this.validateEntries()){
                this.upload.renamedArticleName = `${this.upload.title}_${Date.now().toString()}.md`;
                this.upload.articlePath = `./content/${this.upload.type}/${this.upload.renamedArticleName}`;

                this.$axios.post(`api/upload/article`, {'articlePath' : this.upload.articlePath, 'articleContent' : this.content })
                .then(() => {
                    return this.uploadImage();                    
                })
                .then(() => {
                    return this.pushArticleToFireBase();                    
                })
                .then(() => {
                    const confirmation = () => {
                        this.showSuccess = true;

                        setTimeout(() => {
                            this.showSuccess = false;
                        }, 2000);
                    }                                    

                    this.hideLoadingIcon(confirmation);
                })
                .catch(() => {
                    this.showError = true;
                    this.errorText = 'Error adding new article';
                    this.hideLoadingIcon();

                    setTimeout(() => {
                        this.showError = false;
                    }, 2000);
                });
            } else {
                this.showError = true;

                setTimeout(() => {
                    this.showError = false;
                }, 2000);
            }                      
        },
        // Push article changes to firestore
        pushArticleToFireBase(){            
            this.showLoadingIcon();
            this.filePath = `${this.upload.type}/${this.upload.renamedArticleName}`;

            return this.$fire.firestore.collection(this.upload.type).doc(this.upload.renamedArticleName).set({
                title: this.upload.title,
                subtitle: this.upload.subtitle,
                thumbnailPath: this.upload.thumbnailPath,
                filePath: this.filePath,
                format: 'md'
            });            
        },
        validateEntries(){
            if(this.upload.title && this.upload.subtitle && this.upload.type && this.upload.image && this.content){
                return true;
            } else {
                this.errorText = 'Missing article information';
                return false;
            }
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
        }
    }
}
</script>

<style>
    .dashboard {
        min-height: 500px;
        border-radius: 3px;
        box-shadow: 0px 0px 9px 1px #e6e6e6
    }
    #write_article > div.row.no-gutters{
        position: relative;
        left: 20px;
        top: -40px;
        background-color: white;
        box-shadow: 0px 0px 9px 1px #e6e6e6
    }
    .alert.alert-danger.lead, .alert.alert-success.lead {
        position: absolute;
        top: 45px;
        left: 70px;
        z-index: 5;
        width: 75%;
    }
    .upload-enter-active, .upload-leave-active {
        transition: opacity .5s;
    }
    .upload-enter, .upload-leave-to {
        opacity: 0;
    }
</style>