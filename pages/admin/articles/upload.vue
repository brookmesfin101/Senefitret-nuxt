<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Upload Articles</h3>
                <p class="mb-0">Senefitret > Admin > Articles > Upload</p>
            </div>            
        </div>
        <div class="dashboard bg-white ml-4 pt-5 pl-5 pb-5">
            <div class='row'>
                <div class="col-6">
                    <div class="form-group">     
                        <transition name="upload">
                            <div v-show="showConfirmation" class="alert w-50 pt-4" :class="[isSuccess ? 'alert-success' : 'alert-danger']">                
                                <p class="lead">FILE UPLOADED MUST BE A <strong>PDF</strong></p>
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
                            <option>Manuscript</option>
                            <option>Biological Sciences</option>
                            <option>Science and Society</option>
                            <option>History</option>
                            <option>Culture</option>
                            <option>Religion and Science</option>                
                        </select>
                    </div>
                    <button class="btn btn-success mt-3" v-on:click="submitFile()" :disabled="submitDisabled">Submit</button>
                </div>
                <div class="col-6">
                    <div class='form-group mt-4'>
                        <label class='pr-4 lead'>Upload Article Image Thumbnail</label>
                        <input class="form-control mt-1 w-50" type="file" ref="image" id="image" v-on:change="handleImageUpload()">     
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
                title: '',
                subtitle: '',
                type: '',
                image: '',
                imagePath: ''
            },
            file: '',
            submitDisabled: true,            
            showConfirmation: false,
            isSuccess: true,
        }
    },
    watch: {
        upload: {
            handler(val){                
                if(val.file != '' && val.file !== void 0 && val.image != '' && val.image !== void 0){                
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
          this.upload.file = this.$refs.file.files[0];
      },
      handleImageUpload(){
          this.upload.image = this.$refs.image.files[0];
      },
      submitFile(){
          let formData = new FormData();          

          formData.append('file', this.upload.file);     
          formData.append('thumbnail', this.upload.image);         

          this.$axios.post('api/upload/manuscript',
                formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            ).then((res) => {                
                this.showConfirmation = true;
                this.isSuccess = true;
                setTimeout(() => {
                    this.showConfirmation = false;
                }, 2000)
            })
            .catch(() => {                
                this.showConfirmation = true;
                this.isSuccess = false;
                setTimeout(() => {
                    this.showConfirmation = false;
                }, 2000)
            });
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