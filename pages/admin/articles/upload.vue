<template>
    <div>
        <label>File</label>
        <input type="file" ref="file" id="file" v-on:change="handleFileUpload()">

        <button v-on:click="submitFile()">Submit</button>
    </div>    
</template>

<script>
export default {
    layout: 'admin',
    data(){
        return {
            file: ''
        }
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
            ).then(function(){
                console.log('SUCCESS!!');
            })
            .catch(function(){
                console.log('FAILURE!!');
            });
      }
    }
}
</script>