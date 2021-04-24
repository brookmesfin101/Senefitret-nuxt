<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Article Management</h3>
                <p class="mb-0">Senefitret > Admin > Articles</p>
            </div>            
        </div>
        <div class="dashboard bg-white ml-4">
            <div class="row">
                <div class="col-8">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col"><strong>Name</strong> of Article</th>
                            <th scope="col"><strong>Type</strong> of Article</th>
                            <th scope="col"><strong>View</strong> Article</th>
                            <th scope="col">File Extension</th>
                            </tr>
                        </thead>
                    </table>


                    <ul v-for="pdf in pdfs" :key="pdf.id" class="list-group">
                        <li class="list-group-item">
                            <font-awesome-icon :icon="['fas', 'file-pdf']" class="fa-fw"/>                            
                            <p v-text="pdf.name"></p>
                            <p v-text="pdf.type"></p>
                            <p v-text="pdf.ext"></p>
                        </li>
                    </ul>
                </div>
            </div>                    
        </div>
    </div>  
</template>

<script>
export default {
    layout: 'admin',
    data(){
        return {
            pdfs : []
        }
    },
    methods: {
        ListFiles(){
            this.$axios.get('api/list-pdfs')
                .then((pdfs) => {                    
                    this.pdfs = pdfs.data;
                })
                .catch(err => console.log(err));
        }
    },
    mounted(){
        this.ListFiles();
    }
}
</script>

<style>
    .dashboard {
        height: 500px;
        width: 95%;
        position: relative;
        top: -40px;
        border-radius: 3px;
        box-shadow: 0px 0px 9px 1px #e6e6e6
    }
</style>