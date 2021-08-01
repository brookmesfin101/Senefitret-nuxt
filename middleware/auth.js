export default function ({app, route, redirect}) {        

    if(String(route.fullPath).includes('admin')) {           
        if(!app.$fire.auth.currentUser) {
            return redirect('/auth/signin');                       
        }
    }
}