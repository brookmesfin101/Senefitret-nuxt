<template>  
  <div>
    <section id="mission-statement">      
      <h4 class="title mt-3">
        Mission Statement:
      </h4>
      <p class="mt-3">
        The purpose of this site is to serves as a learning platform for young adults mainly living and working outside of Ethiopia and who want to gain knowledge in works related to biological sciences in Ethiopia. It aims at introducing what was done in the past, and what is also being done now, with major focus on botanical sciences. As far as possible manuscripts will be both in English and Amharic.  
      </p>  
      <button class="btn btn-outline-danger mt-2 mb-2" @click='learnMore'>Learn More</button>
      <hr/>
    </section>  

    <section id="articles" class="mt-4" v-show='articles.length'>
      <p class="lead section-header title">
        Recent Articles
      </p>
      <div id='primary-articles' class='articles-container row no-gutters'>
        <div v-if='mainArticle != null' class='col-lg-6 col-md-4'>
          <RecentArticle :key='"mainArticle"' :thumbnail="mainArticle.thumbnailPath" :title="mainArticle.title" :format="mainArticle.format" :size='"XLarge"'
                        :subtitle="mainArticle.subtitle" v-on:openManuscript="openManuscript($event)"/>                    
        </div>
        <div class='col-lg-6 col-md-8 pl-2'>
          <RecentArticle v-for="(file, index) in primaryArticles" :key='index' :thumbnail="file.thumbnailPath" :title="file.title" :format="file.format" :size='"Detail"'
                        :subtitle="file.subtitle" v-on:openManuscript="openManuscript($event)" :last-column="index == articles.length - 1"/>
        </div>
      </div>
      <hr class='mt-5'>
      <div id='secondary-articles' class='articles-container row no-gutters pr-2'>
          <RecentArticle v-for="(file, index) in tertiaryArticles" :key='index' :thumbnail="file.thumbnailPath" :title="file.title" :format="file.format" :size='"Medium"'
                        :subtitle="file.subtitle" v-on:openManuscript="openManuscript($event)"/>  
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
    computed: {
      mainArticle(){
        return this.articles[0];
      },
      primaryArticles(){
        return this.articles.slice(1, 4);
      },
      tertiaryArticles(){
        return this.articles.slice(4, 7);
      }
    },
    methods: {
        openManuscript(e) {                    
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
                    this.hideLoadingIcon();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        learnMore(){
          window.location = `${window.origin}/about`;
        },
        showLoadingIcon(){
            this.$store.commit('setLoadingStatus', true);
        },
        hideLoadingIcon(func = null){
            if(this.$store.getters.getLoadingStatus){
                setTimeout(() => {
                    this.$store.commit('setLoadingStatus', false);
                    
                    if(func)
                        func();
                }, 1000);
            }
        }
    },
    beforeMount(){
      this.showLoadingIcon();
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
