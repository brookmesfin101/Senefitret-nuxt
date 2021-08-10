<template>
  <section id="articles" class="mt-4">
      <p class="lead section-header title">
        Manuscripts
      </p>
      <div class="articles-container row">
        <RecentArticle v-for="(file, index) in manuscripts" :key='index' :thumbnail="file.thumbnailPath" :title="file.title" :format="file.format" 
                        :subtitle="file.subtitle" v-on:openManuscript="openManuscript($event)"/>
      </div>
    </section>
</template>

<script>
export default {  
    data(){
      return {
        manuscripts: []
      };
    },
    methods: {
        openManuscript(e) {        
            if(e.format == "md"){
              window.location = window.location.href + "/md/" + e.title; 
            } else if(e.format == "pdf"){
              window.location = window.location.href + "/pdf/" + e.title; 
            }                                 
        },
        listFilesAsync(){            
            this.$fire.firestore.collection(this.$route.name).get()
                .then((querySnapshot) => {
                    this.manuscripts = [];
                    querySnapshot.forEach((doc) => {                    
                        this.manuscripts.push(doc.data());                        
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    beforeMount(){
      this.listFilesAsync();
    }    
}
</script>

<style>

</style>