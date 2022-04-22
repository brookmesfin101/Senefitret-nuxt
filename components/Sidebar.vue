<template>
  <div class="col-xl-2 col-lg-3 col-md-3 sidebar">
    <nav class="nav flex-column">
    <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </form> -->
        <div class='pb-3'>
            <li class="mt-3 pl-3">
                <h4 class="section-header">Menu</h4>
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 border-bottom text-uppercase">
                <a class="text-dark" href="/"><p class='mb-0'>HomePage</p></a>                         
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 border-bottom text-uppercase">
                <a class="text-dark" href="/about"><p class='mb-0'>About</p></a>               
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 border-bottom text-uppercase">
                <a class="text-dark" href="/biologicalsciences"><p class='mb-0'>Biological Sciences</p></a>              
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 border-bottom text-uppercase">
                <a class="text-dark" href="/sciencesociety"><p class='mb-0'>Science and Society</p></a>              
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 border-bottom text-uppercase">
                <a class="text-dark" href="/history"><p class='mb-0'>History</p></a>              
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 border-bottom text-uppercase">
                <a class="text-dark" href="/culture"><p class='mb-0'>Culture</p></a>              
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 border-bottom text-uppercase">
                <a class="text-dark" href="/religionscience"><p class='mb-0'>Religion and Science</p></a>              
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 border-bottom text-uppercase">
                <a class="text-dark" href="#"><p class='mb-0'>Documentaries</p></a>              
            </li>
            <li class="nav-item pb-3 pl-3 pt-3 text-uppercase">
                <a class="text-dark" href="/manuscripts"><p class='mb-0'>Manuscripts</p></a>              
            </li>
            <li v-if="IsDevEnvironment" class="nav-item pb-3 pl-3 pt-3 text-uppercase border-top border-bottom">
                <a class="text-dark" href="/test"><p class='mb-0'>Test</p></a> 
            </li>    
        </div>
        
    </nav>
  </div>
</template>

<script>
    export default {
        computed: {
            IsDevEnvironment(){
                return process.env.DEV;
            }
        }
    }
</script>

<style scoped>
    
</style>