<template>
  <section id="articles" class="mt-4">
      <p class="lead section-header title">
        Manuscripts
      </p>
      <div class="articles-container row">
        <RecentArticle :thumbnail="'/images/ManuscriptPics/Sep11Flowers.png'" :title="'The Ethiopian New Year and September 11 '" 
                        :subtitle="'Many people might wonder what September 11 or 9/11 has to do with Ethiopia...'" :crop="'-260px 0px 0px 0px'" v-on:openManuscript="openManuscript($event)"/>
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
            console.log(e);
        }
    }
}
</script>

<style>

</style>