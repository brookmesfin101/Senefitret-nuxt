<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Article Management</h3>
                <p class="mb-0">Senefitret > Admin > Articles</p>
            </div>            
        </div>
        <div class="dashboard bg-white ml-4">
            <button @click="ListFiles" class="btn btn-primary">Read Files</button>
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