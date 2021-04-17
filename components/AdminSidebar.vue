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
                    <a href="/admin"><font-awesome-icon :icon="['fas', 'bars']" class="admin-nav-icon fa-fw mr-3"/> Dashboard</a>
                </li>
                <li class="list-group-item lead bg-primary border-light">
                    <a href="/admin/articles" class="text-light"><font-awesome-icon v-on:click="showSidebar = !showSidebar" :icon="['fas', 'newspaper']" class="admin-nav-icon fa-fw mr-3"/> Articles</a> 
                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="admin-nav-icon fa-fw ml-5"/>
                    <ul>
                        <li class="text-light"><a href="/admin/articles" class="text-light"><small>View Articles</small></a></li>
                        <li class="text-light"><a href="/admin/articles/write" class="text-light"><small>Write Article</small></a></li>
                    </ul>
                </li>                
            </ul>
        </div>            
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>