<template>
  <article class="col-4" :class="{'border-right' : !lastcolumn}">    
      <div class="mt-4">          
          <div class="cropped pointer" v-on:click="$emit('openManuscript', {title, format })" :style="{ backgroundImage : `url('${formattedThumbnail}')`}"></div>           
      </div>  
      <section class="ml-4">
          <p class="lead mt-5 font-weight-bold" v-html="title"></p>
          <p v-html="subtitle"></p>
          <button type="button" v-on:click="$emit('openManuscript', {title, format})" class="btn btn-outline-primary mt-2 mb-3">More</button>
      </section>      
      <hr class="mb-4">
  </article>
</template>

<script>
export default {
    props: {
        'thumbnail': String,
        'title': String,
        'subtitle': String,
        'crop': String,
        'lastcolumn': {
            type: Boolean,
            default: false
        },
        'format': {
            type: String,
            default: "docx"
        }
    },
    computed:{
        formattedThumbnail(){
            return this.thumbnail.replace(' ', '%20');
        }
    }
}
</script>

<style>

</style>