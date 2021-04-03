<template>
  <section id="articles" class="mt-4">
      <p class="lead section-header title">
        Manuscripts
      </p>
      <div class="articles-container row">
        <RecentArticle :thumbnail="'/images/ManuscriptPics/Sep11Flowers.png'" :title="'The Ethiopian New Year and September 11'" :format="'docx'" 
                        :subtitle="'Many people might wonder what September 11 or 9/11 has to do with Ethiopia...'" :crop="'-260px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>
        <RecentArticle :thumbnail="'/images/ManuscriptPics/generic_ethiopia_landscape_1.jpg'" :title="'Neglected Treasure'" :format="'docx'"  
                        :subtitle="'Ethiopia\'s vegetation, as a result of years of heavy exploitation and neglect...'" :crop="'-260px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>                
        <RecentArticle :thumbnail="'/images/ManuscriptPics/Addis_Buildings/1950-1960_Addis_Buildings_html_59f3899b4d864fdb.gif'" :title="'1950 1960 Addis Buildings'" :format="'docx'" 
                        :subtitle="'አበባ ዋና ዋና ሕንጻዎች እንዴት እና በማን...'" :crop="'0px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>   
        <RecentArticle :thumbnail="'/images/ManuscriptPics/Wubishet_Worq_Alemahu_html_dd77b29fd12ddb4d.gif'" :title="'Wubishet Worq Alemahu'" :format="'docx'" 
                        :subtitle="'አቶ ውብሸትን ለመጀመሪያ ጊዜ ያየኋቸው በልጅነቴ ጊዜ ነበር፣...'" :crop="'0px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>  
        <RecentArticle :thumbnail="'/images/ManuscriptPics/generic_flowers_pic_1.jpg'" :title="'Ethiopian Flora Project'" :format="'pdf'" 
                        :subtitle="'Starting with expierence that led the author to devote his life to botany, this article is an attempt to elucidate...'" :crop="'0px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/> 
        <RecentArticle :thumbnail="'/images/ManuscriptPics/FeelingsANarrative.jpg'" :title="'Feelings A Narrative'" :format="'pdf'" 
                        :subtitle="'በቅርቡ አዲሱ የኢትዮዽያ ጠቅላይ ሚኒስትር ዶክተር አቢይ አህመድ በሚሌንየም አዳራሽ ተገኝተው ለተሰበሰበው...'" :crop="'0px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/> 
        <RecentArticle :thumbnail="'/images/ManuscriptPics/dna_image_1.jpg'" :title="'ITS Sequences and Phylogenetic Relationships in Bidens and Coreopsis'" :format="'pdf'" 
                        :subtitle="'Sequences from the internal transcribed spacer region of nuclear ribosomal DNA (ITS) for 35 taxa of Coreopsis and 15 species of Bidens were used to hypothesize phylogenetic relationships within and between the two genera. Coreopsis is paraphyletic and Bid...'" :crop="'0px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/> 
        <RecentArticle :thumbnail="'/images/ManuscriptPics/poem_image_1.jpg'" :title="'Jan 25 1996 Poem'" :format="'pdf'" 
                        :subtitle="'በቀይ ሽብር ያለቁትን ጓደኞቼን (አክሊሉ ህሩይ፣ ፍቅሩ ህሩይ፣ ዮሴፍ አበበ፣ መኮንን በላይ)...'" :crop="'10px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>       
      </div>
    </section>
</template>

<script>
export default {
    methods: {
        openManuscript(e) {        
            if(e.format == "docx"){
              window.location = window.location.href + "/docx/" + e.title; 
            } else if(e.format == "pdf"){
              window.location = window.location.href + "/pdf/" + e.title; 
            }
                                 
        }        
    }
}
</script>

<style>

</style>