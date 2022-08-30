<template>  
  <div>
    <section id="mission-statement">      
      <h4 class="title mt-3">
        Mission Statement:
      </h4>
      <p class="mt-3">
        The purpose of this site is manyfold: 1) to serve as a learning platform for beginners and young adults who would like to further their comprehension skills in biology; 2) to add to the knowledge base of the reader in particularly plant biology; 3) to provide notes on various subjects in biology including human biology; 4) to relates works done in the past, particularly in Ethiopia, with major focus placed on botanical sciences; and 5) to serve as a reference point for topics in plant biology. Topics outside of the above subjects will also be addressed under the various headings. As far as possible manuscripts will be both in English and Amharic.
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
