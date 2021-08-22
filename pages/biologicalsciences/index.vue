<template>
  <section id="articles" class="mt-4">
      <p class="lead section-header title">
        Biological Sciences
      </p>
      <div class="articles-container row">
        <RecentArticle v-for="(file, index) in articles" :key='index' :thumbnail="file.thumbnailPath" :title="file.title" :format="file.format" 
                        :subtitle="file.subtitle" v-on:openManuscript="openManuscript($event, file)"/>
      </div>
    </section>
</template>

<script>
export default {  
    data(){
      return {
        articles: []
      };
    },
    methods: {
        openManuscript(e, file) {                    
            if(e.format == "md"){
              window.location = window.location.href + "/md/" + e.title; 
            } else if(e.format == "pdf"){
              const fileName = file.filePath.replace(`/pdf/${this.$route.name}/`, '').replace('.pdf', '');

              window.location = window.location.href + "/pdf/" + fileName; 
            }                                 
        },
        listFilesAsync(){            
            this.$fire.firestore.collection(this.$route.name).get()
                .then((querySnapshot) => {
                    this.articles = [];
                    querySnapshot.forEach((doc) => {                    
                        if(doc.data().test == void 0){
                            this.articles.push(doc.data());                        
                        }                        
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