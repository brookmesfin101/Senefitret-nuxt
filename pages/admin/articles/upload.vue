<template>
    <div class="pt-5 pl-5">
        <div class="form-group">     
            <transition name="upload">
                <div v-show="showConfirmation" class="alert w-50 pt-4" :class="[isSuccess ? 'alert-success' : 'alert-danger']">                
                    <p class="lead">FILE UPLOADED MUST BE A <strong>PDF</strong></p>
                </div>
            </transition>            
            <label class="pr-4 lead">File to Upload</label>
            <p>The file uploaded must be a PDF for now</p>
            <input class="form-control mt-1 w-25" type="file" ref="file" id="file" v-on:change="handleFileUpload()">            
        </div>
        <!-- <div class="form-group mt-4">
            <label class="pr-4 lead">Type of File</label>
            <select v-model="type" class="form-control mt-1 w-25">
                <option>PDF</option>
                <option>Word</option>
            </select>
        </div> -->
        <button class="btn btn-success mt-3" v-on:click="submitFile()" :disabled="submitDisabled">Submit</button>
    </div>    
</template>

<script>
export default {
    layout: 'admin',
    data(){
        return {
            file: '',
            submitDisabled: true,
            type: null,
            showConfirmation: false,
            isSuccess: true,

        }
    },
    watch: {
        file(val){
            if(val != '' && val != undefined){                
                this.submitDisabled = false;                
            } else {                
                this.submitDisabled = true;                
            }
        }
    },
    mounted(){
        this.$fire.firestore.collection('manuscripts').doc('2W3GBRVWAlVzgjLeQlCe').get().then(res => console.log(res));
        debugger;
    },
    methods: {
      handleFileUpload(){
          this.file = this.$refs.file.files[0];
      },
      submitFile(){
          let formData = new FormData();          

          formData.append('file', this.file);                    

          this.$axios.post('api/single-file',
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
    .upload-enter-active, .upload-leave-active {
        transition: opacity .5s;
    }
    .upload-enter, .upload-leave-to {
        opacity: 0;
    }
</style>