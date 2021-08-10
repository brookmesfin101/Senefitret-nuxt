export default { 
    mounted(){        
        if(!this.$fire.auth.currentUser && String(this.$nuxt.$route.fullPath).includes('admin')) {                     
            return this.$nuxt.context.redirect('/auth/signin');                    
        }
    }
}