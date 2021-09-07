export default {
    data() {
        return {
          articles: []
        };
    },
    methods: {
        openManuscript(e, file) {                    
            if(e.format == "md"){
            window.location = window.location.href + "/md/" + e.title; 
            } else if(e.format == "pdf"){
            const fileName = file.filePath.replace(`/pdf/${this.$route.name}/`, '').replace('.pdf', '');

            window.location = window.location.href + "/pdf/" + fileName; 
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
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    beforeMount(){
        this.listFilesAsync();
    }     
}