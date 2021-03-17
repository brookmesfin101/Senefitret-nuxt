<template>
  <section id="articles" class="mt-4">
      <p class="lead section-header title">
        Manuscripts
      </p>
      <div class="articles-container row">
        <RecentArticle :thumbnail="'/images/ManuscriptPics/Sep11Flowers.png'" :title="'The Ethiopian New Year and September 11'" 
                        :subtitle="'Many people might wonder what September 11 or 9/11 has to do with Ethiopia...'" :crop="'-260px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>
        <RecentArticle :thumbnail="'/images/ManuscriptPics/generic_ethiopia_landscape_1.jpg'" :title="'Neglected Treasure'" 
                        :subtitle="'Ethiopia\'s vegetation, as a result of years of heavy exploitation and neglect...'" :crop="'-260px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>                
        <RecentArticle :thumbnail="'/images/ManuscriptPics/Addis_Buildings/1950-1960_Addis_Buildings_html_59f3899b4d864fdb.gif'" :title="'1950 1960 Addis Buildings'" 
                        :subtitle="'አበባ ዋና ዋና ሕንጻዎች እንዴት እና በማን...'" :crop="'0px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>   
        <RecentArticle :thumbnail="'/images/ManuscriptPics/Wubishet_Worq_Alemahu_html_dd77b29fd12ddb4d.gif'" :title="'Wubishet Worq Alemahu'" 
                        :subtitle="'አቶ ውብሸትን ለመጀመሪያ ጊዜ ያየኋቸው በልጅነቴ ጊዜ ነበር፣...'" :crop="'0px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>   
        <!-- <RecentArticle :thumbnail="'/images/EndemicWildAnimals/AwashShewa.jpg'" :title="'Endemic Wild Animals'" 
                        :subtitle="'Images of endemic and wild Animals of Ethiopia.'" :crop="'0px 0px 0px 0px'"/>
        <RecentArticle :thumbnail="'/images/QueerPlantsEthiopia/QueerPlantPicture.jpg'" :title="'Queer Plants of Ethiopia'" 
                        :subtitle="'Images of queer Ethiopian plants.'" :crop="'0px 0px 0px 0px'" :last-column="true"/>
        <RecentArticle :thumbnail="'/images/UsefulPlantsOfEthiopia/EnseteVentricosum.jpg'" :title="'Useful Plants of Ethiopia'" 
                        :subtitle="'Images of plants useful to the inhabitants of Ethiopia.'" :crop="'0px 0px 0px 0px'"/>
        <RecentArticle :thumbnail="'/images/EndemicPlantsOfEthiopia/BidensMacroptera.jpg'" :title="'Endemic Plants of Ethiopia'" 
                        :subtitle="'I have included 4 endemic plants: Bidens macroptera, Echinops kebericho, Plectocephalus varians and Urtica simensis.'" :crop="'0px 0px 0px 0px'"/>
        <RecentArticle :thumbnail="'/images/WildBirdsEthiopia/CormorantRiftValley.jpg'" :title="'Endemic and Wild Animals of Ethiopia'" 
                        :subtitle="'Images of endemic and wild Animals of Ethiopia.'" :crop="'0px 0px 0px 0px'" :last-column="true"/> -->
      </div>
    </section>
</template>

<script>
export default {
    methods: {
        openManuscript(e) {            
            window.location = window.location.href + "/" + e;                      
        }        
    }
}
</script>

<style>

</style>