<template>
  <section id="articles" class="mt-4">
      <p class="lead section-header title">
       Religion and Science
      </p>
      <div class="articles-container row">
        <RecentArticle v-for="(file, index) in articles" :key='index' :thumbnail="file.thumbnailPath" :title="file.title" :format="file.format" 
                        :subtitle="file.subtitle" v-on:openManuscript="openManuscript($event, file)"/>
      </div>
      <div class='text-secondary' v-if="articles.length <= 0">
        <h3>No Articles have been added to this page yet.</h3>
      </div>    
    </section>
</template>

<script>
import articlesMixin from '@/mixins/articles.mixin';

export default {
  mixins : [articlesMixin]
}
</script>