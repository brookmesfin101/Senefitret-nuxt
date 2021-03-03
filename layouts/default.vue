<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div id="sidebar" class="col-2">
          <nav class="nav flex-column mt-4">
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="text" placeholder="Search">
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            <li class="nav-item mt-4 mb-4">
              <h4 class="section-header">Menu</h4>
            </li>
            <li class="nav-item pb-2 border-bottom text-uppercase">
              <a class="text-dark" href="#"><small>HomePage</small></a>                         
            </li>
            <li class="nav-item pb-2 pt-2 border-bottom text-uppercase">
              <a class="text-dark" href="#"><small>About</small></a>               
            </li>
            <li class="nav-item pb-2 pt-2 border-bottom text-uppercase">
              <a class="text-dark" href="#"><small>Biological Sciences</small></a>              
            </li>
            <li class="nav-item pb-2 pt-2 border-bottom text-uppercase">
              <a class="text-dark" href="#"><small>Science and Society</small></a>              
            </li>
            <li class="nav-item pb-2 pt-2 border-bottom text-uppercase">
              <a class="text-dark" href="#"><small>History</small></a>              
            </li>
            <li class="nav-item pb-2 pt-2 border-bottom text-uppercase">
              <a class="text-dark" href="#"><small>Culture</small></a>              
            </li>
            <li class="nav-item pb-2 pt-2 border-bottom text-uppercase">
              <a class="text-dark" href="#"><small>Religion and Science</small></a>              
            </li>
            <li class="nav-item pb-2 pt-2 border-bottom text-uppercase">
              <a class="text-dark" href="#"><small>Documentaries</small></a>              
            </li>
            <li class="nav-item pb-2 pt-2 text-uppercase">
              <a class="text-dark" href="#"><small>Manuscripts</small></a>              
            </li>

            <li class="nav-item mt-4 mb-4">
              <h4 class="section-header">Get In Touch</h4>
            </li>
            <li>
              <div class="form-inline mb-5">
                <font-awesome-icon :icon="['fas', 'envelope']" class="main-icon fa-2x"/>
                <p class="pb-0 mb-0 ml-3">tmesfin52@gmail.com</p>
              </div>
              <hr>
              <small class="text-muted">© Senefitret.com. All rights reserved.</small>
            </li>
          </nav>
        </div>
        <div class="col-9 mt-5">
          <header class="site-header">
            <p class="title">
              Senefitret.com
            </p>  
          </header>
          <Nuxt />
        </div>
      </div>      
    </div> 
  </div>
</template>

<style>
.site-header {
  border-bottom: solid 5px #f56a6a; 
}
</style>
