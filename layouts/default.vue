<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <transition v-on:before-enter="beforeEnter" :name="(allowTransition) ? 'sidebar' : ''">
          <Sidebar v-show="showSidebar"/>                       
        </transition>
        <div class="col-10 mt-6">
          <div class="row">
            <div class="col-1">
              <div>
                <font-awesome-icon v-on:click="showSidebar = !showSidebar" :icon="['fas', 'bars']" class="main-icon fa-2x mt-4 ml-4 mr-3 menu-toggle"/>
              </div> 
            </div>
            <div class="col-11">
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
    </div> 
  </div>
</template>

<script>
export default {
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
