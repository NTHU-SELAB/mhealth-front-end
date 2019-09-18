<template>
    <div class="food-list-item mb-2">
        <img :src="imageUrl" class="food-image" alt="">
        <div><span>{{shopName}} {{foodName}}</span></div>
        <div>
            <span>熱量 </span>
            <span style="color:red;">{{calorie}} </span>
            <span>大卡</span>
        </div>
    </div>
</template>


<script>
export default {
    props: ['shopName', 'foodName', 'calorie'],
    data() {
        return {
            imageUrl: 'https://www.nownews.com/wp-content/uploads/2019/07/1563504586-2cdb119e5ae9d0f59fdaf2b973d46411.png'
        }
    }
}
</script>


<style scoped>

.food-list-item {
    text-align: left;
}

.food-image {
    max-width: 100%;
}

</style>