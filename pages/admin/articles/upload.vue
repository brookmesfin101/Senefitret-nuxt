<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Upload Articles</h3>
                <p class="mb-0">Senefitret > Admin > Articles > Upload</p>
            </div>            
        </div>        
        <div class="dashboard bg-white ml-4 pt-5 pl-5 pb-5">
            <!-- <button class='btn btn-primary' @click="testServerConnection">Test Connection</button> -->
            <!-- <button class='btn btn-primary' @click='clearFile'>Clear File</button> -->
            <div class='row'>
                <div class="col-6">
                    <div class="form-group">     
                        <transition name="upload">
                            <div v-show="showConfirmation" class="alert w-50 pt-4" :class="[isSuccess ? 'alert-success' : 'alert-danger']">                
                                <p v-if='!isSuccess' class="lead" v-text="errorMessage"></p>
                                <p v-if='isSuccess' class="lead">FILE SUCCESSFULLY UPLOADED</p>
                            </div>
                        </transition>            
                        <label class="pr-4 lead">File to Upload</label>
                        <p>The file uploaded must be a PDF for now</p>
                        <input class="form-control mt-1 w-50" type="file" ref="file" id="file" v-on:change="handleFileUpload()">            
                    </div>
                    <div class='form-group mt-4'>
                        <label class='pr-4 lead'>Title of Article</label>
                        <input type='text' name='ArticleTitle' v-model='upload.title' class='form-control mt- w-50'>
                    </div>
                    <div class='form-group mt-4'>
                        <label class='pr-4 lead'>Subtitle of Article</label>
                        <input type='text' name='ArticleSubtitle' v-model='upload.subtitle' class='form-control mt- w-50'>
                    </div>
                    <div class="form-group mt-4">
                        <label class="pr-4 lead">Type of Article</label>
                        <select v-model="upload.type" name='ArticleType' class="form-control mt-1 w-50">                    
                            <option value='manuscripts'>Manuscript</option>
                            <option v-if='isDevEnvironment' value='test'>Test</option>
                            <option value='biologicalsciences'>Biological Sciences</option>
                            <option value='sciencesociety'>Science and Society</option>
                            <option value='history'>History</option>
                            <option value='culture'>Culture</option>
                            <option value='religionscience'>Religion and Science</option>                                            
                        </select>
                    </div>
                    <button class="btn mt-3" v-on:click="submitFile()" :class='submitButtonColor' :disabled="submitDisabled">Submit</button>
                </div>
                <div class="col-6">
                    <div class='form-group'>
                        <label class='pr-4 lead'>Upload Article Image Thumbnail</label>
                        <p>Image file must be a PNG, JPG, JPEG or GIF format</p>
                        <input class="form-control mt-1 w-50" type="file" ref="image" id="image" v-on:change="handleImageUpload()">     
                    </div>
                    <div id='Thumbnail_Preview' class='mt-4'>
                        <img :src='tempImagePath' class='w-75'>
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
            upload: {
                file: '',
                filePath: '',
                fileExt: '',
                title: '',
                subtitle: '',
                type: '',
                image: '',
                imagePath: '', 
                imageExt: ''               
            },            
            tempImagePath: '',
            submitDisabled: true,            
            showConfirmation: false,
            isSuccess: true,
            errorMessage: ''
        }
    },
    computed: {
        submitButtonColor(){
            return this.submitDisabled ? 'btn-outline-dark' : 'btn-success';
        },
        isDevEnvironment(){
            return process.env.DEV;
        }
    },
    watch: {
        upload: {
            handler(val){      
                if(this.validateUploadEntries(val)){
                    this.submitDisabled = false;  
                } else {
                    this.submitDisabled = true; 
                }
            },
            deep: true
        }
    },  
    methods: {
      handleFileUpload(){
          this.isSuccess = true;
          this.showConfirmation = false;
          this.errorMessage = '';

          this.upload.file = this.$refs.file.files[0];
      },
      validateUploadEntries(upload){
          if(upload.file && upload.title && upload.subtitle && upload.type && upload.image){
              return true;
          } else {
              return false;
          }
      },
      handleImageUpload(){
          this.upload.image = this.$refs.image.files[0];
            
          var reader = new FileReader();
          reader.onload = (e) => {              
            this.tempImagePath = e.target.result;
          }          
          reader.readAsDataURL(this.upload.image);
      },
      formatError(){
          this.isSuccess = false;
          this.showConfirmation = true;
          this.errorMessage = 'Article must be PDF format.';
      },
      submitFile(){
          if(!this.upload?.file?.type.includes('pdf') ?? false){
              this.formatError();
              return;
          }

          let formData = new FormData();                
                  
          var renamedFile = this.renameFileBeforeSaving();     
          var renamedImage = this.renameImageBeforeSaving();    

          formData.append('file', renamedFile);     
          formData.append('thumbnail', renamedImage);

          this.upload.filePath = `/pdf/${this.upload.type}/${renamedFile.name}`;
          this.upload.imagePath = `/images/${this.upload.type}/${renamedImage.name}`;  
                                            
          this.showLoadingIcon();

          this.$axios.post(`api/upload/${this.upload.type}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            ).then(() => {     
                this.createDBEntry(renamedFile.name);

                
            })
            .catch((err) => {     
                this.errorMessage = err.response.data.error;
                console.error(this.errorMessage);
                this.showConfirmation = true;
                this.isSuccess = false;
                setTimeout(() => {
                    this.showConfirmation = false;
                }, 2000)
            });
      },
      createDBEntry(fileName){

          this.$fire.firestore.collection(this.upload.type).doc(fileName).set({
              format: this.upload.fileExt,
              title: this.upload.title,
              subtitle: this.upload.subtitle,
              thumbnailPath: this.upload.imagePath,
              filePath: this.upload.filePath
          })
          .then((res) => {
              const confirmation = () => {
                  this.showConfirmation = true;
                this.isSuccess = true;
                setTimeout(() => {
                    this.showConfirmation = false;
                }, 2000);
              };
              
              this.hideLoadingIcon(confirmation);
          })
          .catch((err) => {
              console.log(err);
          })
      },
      renameFileBeforeSaving(){
          var file = this.upload.file;
          this.upload.fileExt = this.upload.file.type.replace('application/', '');
          var ext = '.' + this.upload.file.type.replace('application/', '');
          
          var newName = file.name.replace(ext, '').concat('_', new Date().getTime().toString(), ext);

          var blob = file.slice(0, file.size, file.type); 
          var newFile = new File([blob], newName, {type: file.type});

          return newFile;
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
      testServerConnection(){
          this.$axios.get('api/test/connection')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
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
      clearFile(){
          this.$refs.file.value = null;
      }
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
    .upload-enter-active, .upload-leave-active {
        transition: opacity .5s;
    }
    .upload-enter, .upload-leave-to {
        opacity: 0;
    }
</style>