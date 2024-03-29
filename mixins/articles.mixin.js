export default {
    data() {
        return {
          articles: []
        };
    },
    methods: {
        openManuscript(e, file) {                           
            if(e.format == "md"){
                const title = file.filePath.match(/(?<=\/)(.*)(?=.md)/)[0];

                window.location = window.location.href + "/md/" + title; 
            } else if(e.format == "pdf"){
                const title = file.filePath.replace('/pdf/', '').replace('./static/pdfs/').replace('biologicalsciences', '').replace('history', '')
                .replace('culture', '').replace('sciencesociety', '').replace('religionscience', '').replace('manuscripts', '').match(/(?<=\/)(.*)(?=.pdf)/)[0];                
                
                window.location = window.location.href + "/pdf/" + title; 
            }                                 
        },
        listFilesAsync(){            
            this.$fire.firestore.collection(this.$route.name).get()
                .then((querySnapshot) => {
                    this.articles = [];
                    querySnapshot.forEach((doc) => {                                
                        if(doc.data().test == void 0){
                            this.articles.push(doc.data());                        
                        }
                    });
                    this.hideLoadingIcon(null);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showLoadingIcon(){
            this.$store.commit('setLoadingStatus', true);
        },
        hideLoadingIcon(func = null){
            if(this.$store.getters.getLoadingStatus){
                setTimeout(() => {
                    this.$store.commit('setLoadingStatus', false);
                    
                    if(func)
                        func();
                }, 1000);
            }
        }
    },
    beforeMount(){
        this.showLoadingIcon();
        this.listFilesAsync();
    }     
}