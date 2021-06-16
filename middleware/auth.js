export default function ({app, route, redirect}) {
    
    if(String(route.path).includes('admin')) {        
        if(app.$fire.auth.currentUser) {
            return redirect('/admin/auth/signin');
        }
    }
}