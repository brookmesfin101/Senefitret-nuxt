<template>  
      <div class='row no-gutters'>
        <div id="LoginPanel" class='col-4 mt-5 offset-4 bg-white'>
          <h3 class='pt-5 pb-5 text-center'><strong>Login</strong></h3>
          <div class='pl-4 pr-4 mb-5'>
            <p class='mb-0'>Username</p>
            <div class="form-inline border-bottom">
              <font-awesome-icon :icon="['fas', 'user']" class="fa-fw border-bottom'"/>
              <input class='form-control border-0' type='text' v-model='login.username' placeholder='Type your username'/>
            </div>
            <p class='mb-0 mt-3'>Password</p>
            <div class="form-inline border-bottom">
              <font-awesome-icon :icon="['fas', 'lock']" class="fa-fw border-bottom'"/>
              <input class='form-control border-0' type='password' v-model='login.password' placeholder='Type your password'/>
            </div>
            <p class='text-right text-dark'>Forgot password?</p>
            <button class='btn btn-success btn-block mb-4 mt-5' type='button' @click='signIn'>Login</button>
          </div>          
        </div>
      </div>
</template>

<script>
export default {
  layout: 'empty',
  data(){
    return {
      login : {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    signIn(){      
      this.$fire.auth.signInWithEmailAndPassword(this.login.username, this.login.password)
        .then((res) => {          
          this.updateCurrentUser(res.user);      
        })
        .catch((err) => {
          console.error(err);
        })
    },
    updateCurrentUser(user){
      this.$fire.auth.updateCurrentUser(user)
        .then(() => {
          this.$nuxt.context.redirect('/admin');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}
</script>

<style scoped>
#LoginPanel {
  border-radius: 10px;
  max-height: 530px;
}
div.row {
  background-image: url('/images/Backgrounds/robert-katzki-fyHkeWGOpHM-unsplash.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
div > input.form-control {
  width: 82%;
}
</style>