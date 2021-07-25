export default function ({app, route}) {

    if(String(route.fullPath).includes('admin')) {           
        if(!app.$fire.auth.currentUser) {
            
            app.router.push(
                { 
                    name : 'admin-auth-signin',
                    path: '/admin/auth/signin' 
                }
            );
        }
    }
}