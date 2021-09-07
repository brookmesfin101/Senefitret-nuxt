<template>  
  <div>
    <section id="mission-statement">      
      <h4 class="title mt-5">
        Mission Statement:
      </h4>
      <p class="mt-3">
        The purpose of this site is to serves as a learning platform for young adults mainly living and working outside of Ethiopia and who want to gain knowledge in works related to biological sciences in Ethiopia. It aims at introducing what was done in the past, and what is also being done now, with major focus on botanical sciences. As far as possible manuscripts will be both in English and Amharic.  
      </p>  
      <button class="btn btn-outline-danger mt-2 mb-5">Learn More</button>
      <hr/>
    </section>  

    <section id="articles" class="mt-4">
      <p class="lead section-header title">
        Recent Articles
      </p>
      <div class="articles-container row">
        <RecentArticle v-for="(file, index) in articles" :key='index' :thumbnail="file.thumbnailPath" :title="file.title" :format="file.format" 
                        :subtitle="file.subtitle" v-on:openManuscript="openManuscript($event)" :last-column="index == articles.length - 1"/>
      </div>
    </section>
  </div>    
</template>

<script>
export default {
    data(){
        return {
          articles: []
        };
    },
    methods: {
        openManuscript(e) {        
            console.log(window.location.href);
            if(e.format == "md"){
              window.location = window.location.href + "manuscripts/md/" + e.title; 
            } else if(e.format == "pdf"){
              window.location = window.location.href + "manuscripts/pdf/" + e.title; 
            }                                 
        },
        listFilesAsync(){            
            this.$fire.firestore.collection('manuscripts').get()
                .then((querySnapshot) => {
                    this.articles = [];
                    querySnapshot.forEach((doc) => {                    
                        this.articles.push(doc.data());                        
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
.section-header {
  display: inline-block;
  padding-top: 10px;
  border-bottom: solid 5px #f56a6a; 
}
.articles-container {
  display: flex;
}
</style>
