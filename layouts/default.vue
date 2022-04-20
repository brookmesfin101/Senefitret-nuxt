<template>
  <div>
    <div class="container-fluid pl-0 pr-0">
      <LoadingGear></LoadingGear>
      <main class="row no-gutters">
        <transition v-on:before-enter="beforeEnter" :name="(allowTransition) ? 'sidebar' : ''">
          <Sidebar v-show="showSidebar"/>                       
        </transition>
        <div id='Main' class='col-xl-10 col-lg-9 col-md-9 mt-4 pb-5'>
          <div class='ml-3'>
            <div>
              <font-awesome-icon v-on:click="showSidebar = !showSidebar" :icon="['fas', 'bars']" class="main-icon fa-2x mr-3 menu-toggle"/>
            </div> 
            <header class="site-header mt-3">
              <p class="title">
                Senefitret.com
              </p>  
            </header>
            <Nuxt /> 
          </div>                            
        </div>        
      </main>
      <footer>
        <ul class='pt-2 pl-5 pr-5'>
          <li class="mb-4">
            <h4 class="footer-header">Get In Touch</h4>
          </li>
          <li>
              <div class="form-inline mb-3">
                <font-awesome-icon :icon="['fas', 'envelope']" style='color: white' class="main-icon fa-2x"/>
                <p class="pb-0 mb-0 ml-3"><a href='/about/contactus'>tmesfin52@gmail.com</a></p>
              </div>
              <hr class='mt-0 mb-0' style='color: white'>              
          </li>
          <li class='text-center pt-2 pb-2'>
            <small>© www.senefitret.com. All rights reserved.</small>
            <small class='pl-2 pr-2'>|</small>
            <small><a href='/about/privacypolicy'>Privacy Policy</a></small>
          </li>
        </ul>        
      </footer>      
    </div> 
  </div>
</template>

<script>
import authMixin from "@/mixins/auth.mixin";

export default {
  mixins: [authMixin],
  data() {
    return {
      showSidebar: true, 
      isMounted: false,
      allowTransition: false    
    }    
  },
  methods : {
    beforeEnter(){      
      this.allowTransition = (this.isMounted) ? this.isMounted : !this.isMounted;
    }
  },
  mounted(){
    this.isMounted = true;
  }
}
</script>

<style>
.site-header {
  border-bottom: solid 5px #f56a6a; 
}
.menu-toggle {
  cursor: pointer;
}
.sidebar-leave-active,
.sidebar-enter-active {
  transition: .3s;
}
.sidebar-enter {
  transform: translate(-100%, 0);
}
.sidebar-leave-to {
  transform: translate(-100%, 0);
}
</style>
