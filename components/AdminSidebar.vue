<template>
  <div class="col-2 sidebar full-height">
        <div class="mt-4">
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search">
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>

            <h4 class="ml-3 mt-3 section-header">
                Admin
            </h4>  

            <ul class="list-group list-group-flush">
                <li class="list-group-item lead active"><a href="/admin"><font-awesome-icon v-on:click="showSidebar = !showSidebar" :icon="['fas', 'bars']" class="admin-nav-icon fa-fw mr-3"/> Dashboard</a></li>
                <li class="list-group-item lead"><a href="/admin/articles"><font-awesome-icon v-on:click="showSidebar = !showSidebar" :icon="['fas', 'newspaper']" class="admin-nav-icon fa-fw mr-3"/> Articles</a></li>
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