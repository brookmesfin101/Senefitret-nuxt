<template>
  <div class="col-2 bg-primary full-height">
        <div class="mt-4">
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search">
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>

            <h4 class="ml-3 mt-3 section-header text-light">
                Admin
            </h4>  

            <ul class="list-group list-group-flush">
                <li class="list-group-item lead bg-primary border-light">
                    <a :class="{'text-light' : path != 'dashboard'}" href="/admin"><font-awesome-icon :icon="['fas', 'bars']" class="admin-nav-icon fa-fw mr-3"/> Dashboard</a>
                </li>
                <li class="list-group-item lead bg-primary border-light">
                    <a :class="{'text-light' : !highlightArticles()}" href="/admin/articles">
                        <font-awesome-icon :icon="['fas', 'newspaper']" class="admin-nav-icon fa-fw mr-3"/> Articles
                    </a> 
                    <!-- <font-awesome-icon :icon="['fas', 'chevron-right']" class="admin-nav-icon fa-fw ml-5"/> -->
                    <ul class='list-unstyled'>
                        <li>
                            <font-awesome-icon :icon="['fas', 'eye']" class="admin-nav-icon fa-fw fa-xs mr-2 ml-4"/> 
                            <a href="/admin/articles" :class="{'text-light' : path != 'articles'}"><small>View Articles</small></a>
                        </li>
                        <li v-show="false">
                            <font-awesome-icon :icon="['fas', 'edit']" class="admin-nav-icon fa-fw fa-xs mr-2 ml-4"/> 
                            <a href="/admin/articles/write" :class="{'text-light' : path != 'articles/write'}"><small>Write Article</small></a>
                        </li>
                        <li>
                            <font-awesome-icon :icon="['fas', 'upload']" class="admin-nav-icon fa-fw fa-xs mr-2 ml-4"/> 
                            <a href="/admin/articles/upload" :class="{'text-light' : path != 'articles/upload'}"><small>Upload Article</small></a>
                        </li>
                    </ul>
                </li>                
            </ul>
        </div>            
    </div>
</template>

<script>
export default {
    data(){
        return {
            path: ''
        }
    }, 
    methods: {
        highlightArticles(){            
            return String(this.path).includes('articles');
        }
    },
    mounted() {
        var path = String($nuxt.$route.path).replace('/admin/', '').replace('/admin', '');
        this.path = path == '' ? 'dashboard' : String(path).toLowerCase();        
        console.log(this.path);
    }
}
</script>

<style>

</style>