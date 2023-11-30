<template>
    <div>
        <nav-bar/> 
        <div class="btn-group mb-3" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" v-on:click="page1">食物紀錄</button>
            <button type="button" class="btn btn-secondary" v-on:click="page2">健康紀錄</button>
            <button type="button" class="btn btn-secondary" v-on:click="page3">運動紀錄</button>
        </div>
        <div class="container p-3 bg-white bg-opacity-50">
            <div v-if="this.pagenum === 1"><add-food-manually-page/></div>
            <div v-else-if="this.pagenum === 2"><add-health-data/></div>
            <div v-else-if="this.pagenum === 3"><add-sport-data/></div>
            
            
            <!-- <div class="row">
                <div class="col col-md-6">
                    <add-food-manually-page/>
                </div>
                <div class="col col-md-6">
                    <add-health-data/>
                </div>
            </div> -->
            
            
        </div>
        
    </div>
</template>

<script>
export default {
    
    components: {

    },
    data() {
        return {
            pagenum:1
        }
    },
    methods:{
        page1(){
            this.pagenum=1;
        },
        page2(){
            this.pagenum=2;
        },
        page3(){
            this.pagenum=3;
        },
    }
}
</script>

<style>

</style>
