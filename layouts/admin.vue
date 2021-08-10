<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <AdminSidebar/>
        <div class="col-10 mt-6">
             <header class="site-header">
                <p class="title d-inline">Senefitret.com</p>  
                <a class='float-right pr-5' @click='signOut'><strong>Sign Out</strong></a>
              </header>
              <Nuxt /> 
        </div>
    </div>         
    </div> 
  </div>
</template>

<script>
import authMixin from "@/mixins/auth.mixin";

export default {
  mixins: [authMixin],
  methods: {
    signOut() {
      this.$fire.auth.signOut()
        .then(() => {
          this.$nuxt.context.redirect('/');
        });
    }
  }
}
</script>

<style scoped>
  header.site-header > a.float-right:hover {    
    cursor: pointer;
  }
</style>
