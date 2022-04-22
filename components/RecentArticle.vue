<template>
  <article :class='columnSize' >    
      <div v-if='size !== "Detail"'>
          <div class="mt-4">          
              <div class="cropped pointer" :class='thumbnailSize' v-on:click="$emit('openManuscript', {title, format })" :style="{ backgroundImage : `url('${formattedThumbnail}')`}">
                  <div style='position: relative' :class='thumbnailSize'></div>
              </div>       
          </div>  
          <section class="ml-4">
              <p class="lead mt-3 font-weight-bold" v-html="title"></p>
              <p v-html="subtitle"></p>
              <button type="button" v-on:click="$emit('openManuscript', {title, format})" class="btn btn-outline-primary mt-2 mb-3">More</button>
          </section>                
      </div>
      <div class='row no-gutters' v-if='size === "Detail"'>
          <div class="col-lg-3 col-md-5 col-sm-3 col-xs-5 mt-4">          
              <div class="cropped pointer float-left" :class='thumbnailSize' v-on:click="$emit('openManuscript', {title, format })" :style="{ backgroundImage : `url('${formattedThumbnail}')`}">
                  <div style='position: relative' :class='thumbnailSize'></div>
              </div>           
          </div> 
          <section class="col-lg-9 col-md-7 col-sm-9 col-xs-7">
              <div class='float-left'>
                <p class="lead mt-3 font-weight-bold" v-html="title"></p>
                <p v-html="subtitle"></p>
                <button type="button" v-on:click="$emit('openManuscript', {title, format})" class="btn btn-outline-primary mt-2 mb-3">More</button>
              </div>              
          </section>   
      </div>
  </article>
</template>

<script>
export default {
    props: {
        'thumbnail': String,
        'title': String,
        'subtitle': String,
        'crop': String,
        'size': String,
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
            if(process.env.DEV === true){
                return 'images/test/test-tv.png';
            }
            return this.thumbnail?.replace(' ', '%20') ?? '';
        },
        columnSize(){
            if(this.size === 'XLarge'){
                return '';
            } else if(this.size === 'Medium'){
                return 'col-lg-4 col-md-6 col-sm-12';
            } else if(this.size === 'Detail'){
                return '';
            }
            return 'col-4';
        },
        thumbnailSize(){
            if(this.size === 'XLarge'){
                return 'XLarge-Thumbnail';
            } else if(this.size === 'Medium'){
                return 'Medium-Thumbnail';
            } else if(this.size === 'Detail'){
                return 'Detail-Thumbnail';
            }
            return 'Medium-Thumbnail';
        }
    }
}
</script>

<style scoped>
    .cropped.pointer {
        background-position: center;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
    .cropped.pointer > div:hover {
        background-color: rgba(0, 0, 0, .2) !important;
        border-radius: 5px;
    }
</style>