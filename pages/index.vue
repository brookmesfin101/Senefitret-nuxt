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
        <RecentArticle :thumbnail="'/images/IntroducedPlantsInEthiopia/Araucaria.jpg'" :title="'Introduced Plants in Ethiopia'" 
                        :subtitle="'Images of plants introduced to Ethiopia.'" :crop="'-260px 0px 0px 0px'"/>
        <RecentArticle :thumbnail="'/images/EndemicWildAnimals/AwashShewa.jpg'" :title="'Endemic Wild Animals'" 
                        :subtitle="'Images of endemic and wild Animals of Ethiopia.'" :crop="'0px 0px 0px 0px'"/>
        <RecentArticle :thumbnail="'/images/QueerPlantsEthiopia/QueerPlantPicture.jpg'" :title="'Queer Plants of Ethiopia'" 
                        :subtitle="'Images of queer Ethiopian plants.'" :crop="'0px 0px 0px 0px'" :last-column="true"/>
        <RecentArticle :thumbnail="'/images/UsefulPlantsOfEthiopia/EnseteVentricosum.jpg'" :title="'Useful Plants of Ethiopia'" 
                        :subtitle="'Images of plants useful to the inhabitants of Ethiopia.'" :crop="'0px 0px 0px 0px'"/>
        <RecentArticle :thumbnail="'/images/EndemicPlantsOfEthiopia/BidensMacroptera.jpg'" :title="'Endemic Plants of Ethiopia'" 
                        :subtitle="'I have included 4 endemic plants: Bidens macroptera, Echinops kebericho, Plectocephalus varians and Urtica simensis.'" :crop="'0px 0px 0px 0px'"/>
        <RecentArticle :thumbnail="'/images/WildBirdsEthiopia/CormorantRiftValley.jpg'" :title="'Endemic and Wild Animals of Ethiopia'" 
                        :subtitle="'Images of endemic and wild Animals of Ethiopia.'" :crop="'0px 0px 0px 0px'" :last-column="true"/>
      </div>
    </section>
  </div>    
</template>

<script>
export default {
  
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
