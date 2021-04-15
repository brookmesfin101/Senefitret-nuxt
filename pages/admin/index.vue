<template>
    <div>
        <div class="jumbotron bg-danger mt-3 mb-0">
            <div class="mt-2 text-white">
                <h3 class="mb-0">Dashboard</h3>
                <p class="mb-0">Senefitret > Admin > Dashboard</p>
            </div>            
        </div>
        <div class="dashboard bg-white ml-4">
        </div>
    </div>  
</template>

<script>
export default {
    layout: 'admin'
}
</script>

<style>
    .dashboard {
        height: 500px;
        width: 80%;
        position: relative;
        top: -40px;
        border-radius: 3px;
        box-shadow: 0px 0px 9px 1px #e6e6e6
    }
</style>