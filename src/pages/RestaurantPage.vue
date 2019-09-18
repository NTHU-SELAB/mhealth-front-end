<template>
    <div class="container">
        <div class="row">
            <div class="input-group mt-2 mb-3 col-12">
                <input type="number" class="form-control" style="border:2px #ccc solid; border-radius:20px;" placeholder="輸入餐廳名稱或食物名稱" aria-describedby="basic-addon2" v-model="searchKeyword">
            </div>
            <div class="col-6" v-for="n in 10">
                <food-list-item :shopName="'八方雲集'" :foodName="'麻醬麵'" :calorie="'856'">
                </food-list-item>
            </div>
        </div>
    </div>
</template>


<script>

import FoodListItem from '@/components/FoodListItem.vue'

export default {

    components: {
        FoodListItem
    },

    data() {
        return {
            searchKeyword: ''
        }
    }
}
</script>

<style scoped>

</style>