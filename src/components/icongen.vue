<template>
    <div class="container">
        <div v-if="this.iconname === 3"><img src="../assets/roasted-chicken.png" width="50px" height="50px"></div>
        <div v-else-if="this.iconname === 1"><img src="../assets/hamburger.png" width="50px" height="50px"></div>
        <div v-else-if="this.iconname === 2"><img src="../assets/biryani.png" width="50px" height="50px"></div>
        <div v-else-if="this.iconname === 4"><img src="../assets/noodles.png" width="50px" height="50px"></div>
        <div v-else-if="this.iconname === 0"><img src="../assets/iftar.png" width="50px" height="50px"></div>
        <div v-else-if="this.iconname === 5"><img src="../assets/dairy-products.png" width="50px" height="50px"></div>
        <div v-else-if="this.iconname === 6"><img src="../assets/burrito.png" width="50px" height="50px"></div>
    </div>
</template>


<script>
export default {
    props: {
        foodname:[String],
    },
    data(){
        return {
            iconname:""
        }
    },
    created() {
        if(this.foodname.includes("堡")){
            this.iconname=1
        }else if(this.foodname.includes("飯")){
            this.iconname=2
        }else if(this.foodname.includes("雞")){
            this.iconname=3
        }else if(this.foodname.includes("麵") || this.foodname.includes("粉")){
            this.iconname=4
        }else if(this.foodname.includes("優格") || this.foodname.includes("布丁")){
            this.iconname=5
        }else if(this.foodname.includes("餅") || this.foodname.includes("布丁")){
            this.iconname=6
        }else{
            this.iconname=0
        }
    }
}
</script>

<style scoped>
</style>