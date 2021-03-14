<template>
  <article class="col-4">    
      <div class="mt-4">          
          <div class="cropped" :style="{ backgroundImage : `url(${thumbnail})`}"></div> 
      </div>  
      <section class="ml-4">
          <p class="lead mt-5 font-weight-bold" v-html="title"></p>
          <p v-html="subtitle"></p>
          <button type="button" class="btn btn-outline-primary mt-2 mb-3">More</button>
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
        'crop': String
    }
}
</script>

<style>

</style>