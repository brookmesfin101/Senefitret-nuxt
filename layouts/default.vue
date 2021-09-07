<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <transition v-on:before-enter="beforeEnter" :name="(allowTransition) ? 'sidebar' : ''">
          <Sidebar v-show="showSidebar"/>                       
        </transition>
        <div id='Main' class='col-xl-10 col-lg-9 col-md-9 mt-5 pl-0'>
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
      </div>      
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
