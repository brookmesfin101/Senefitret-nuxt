export default function ({app, store, route, redirect}) {
    if(!process.server && String(route.fullPath).includes('admin')){        
        if(!store.state.user) {         
            console.log('state.user : ', store.state.user);
            return redirect('/auth/signin');                       
        }
    }
}