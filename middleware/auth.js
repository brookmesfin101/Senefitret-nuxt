export default function ({app, route, redirect}) {
    if(!process.server && String(route.fullPath).includes('admin')){            
        if(!app.$fire.auth.currentUser) {                     
            return redirect('/auth/signin');                       
        }
    }
}