<template>
    <div class="container">
        <div class="row">
            <div class="input-group mt-2 mb-3 col-12">
                <input type="number" class="form-control" style="border:2px #ccc solid; border-radius:20px;" placeholder="輸入餐廳名稱或食物名稱" aria-describedby="basic-addon2" v-model="searchKeyword">
            </div>
            <div class="col-6" @click="routeToRestaurantFood()">
                <food-list-item 
                    :shopName="'bigreeny 料理．家'" :foodName="'桔醬雞片烙烤吐司套餐'" 
                    :calorie="856" :price="104"
                    :imageUrl="'https://i.imgur.com/C5wnzsw.jpg'"
                    ></food-list-item>
            </div>
            <div class="col-6" @click="routeToRestaurantFood()">
                <food-list-item 
                    :shopName="'腰果花砧板原食料理'" :foodName="'蘋果梅花豬套餐'" 
                    :calorie="856" :price="430"
                    :imageUrl="'https://i.imgur.com/iurKo5u.jpg'">
                    </food-list-item>
            </div>
            <div class="col-6" @click="routeToRestaurantFood()">
                <food-list-item 
                    :shopName="'小倉廚Kitchen loft'" :foodName="'天使羽毛豬'" 
                    :calorie="856" :price="170"
                    :imageUrl="'https://i.imgur.com/bkRIUXL.jpg'">
                </food-list-item>
            </div>
            <div class="col-6" @click="routeToRestaurantFood()">  
                <food-list-item 
                    :shopName="'稲実（稻實）- 純米甘味專賣'" :foodName="'企鵝寶包'" 
                    :calorie="856" :price="150"
                    :imageUrl="'https://i.imgur.com/GSK97R7.jpg'">
                </food-list-item>
            </div>
            <div class="col-6" @click="routeToRestaurantFood()">
                <food-list-item 
                    :shopName="'井家 TEA HOUSE'" :foodName="'酪梨起司塔可飯'" 
                    :calorie="856" :price="290"
                    :imageUrl="'https://i.imgur.com/PYPMlfu.jpg'">
                </food-list-item>
            </div>
            <div class="col-6" @click="routeToRestaurantFood()">
                <food-list-item 
                    :shopName="'皿富器食 minfood'" :foodName="'花雕野菜'" 
                    :calorie="856" :price="255"
                    :imageUrl="'https://i.imgur.com/376iFbj.jpg'">
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
    }, 
    methods: {
        routeToRestaurantFood() {
            this.$router.push({ name: 'restaurant-food-page' })
        }
    }
}
</script>

<style scoped>

</style>