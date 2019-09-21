<template>
    <div class="container">
        <div class="row mt-3 justify-content-center">
            <div class="col-12 title-text">
                <p>{{shopName}}</p>
                <p>{{foodName}}</p>
            </div>
            <div class="col-12 mb-3">
                <img class="food-image" :src="imageUrl" alt="">
            </div>

            <div class="col-12 food-info-text">
                <p style="margin-bottom:0px;">地址：{{location}}</p>
            </div>

            <div class="col-12 food-info-text">
                <p style="margin-bottom:0px;">電話：{{phoneNumber}}</p>
            </div>

            <div class="col-12 food-info-text mt-3 mb-1" style="font-weight: bold;">
                飲食資訊
            </div>

            <div class="col-6 food-info-text">
                <span>熱量： </span>
                <span style="color: red;">{{calorie}} </span>
                <span>大卡</span>
            </div>
            <div class="col-6 food-info-text">
                <span>價格： </span>
                <span>{{price}} </span>
                <span>元</span>
            </div>

            <div class="col-6 food-info-text">
                <span>粗脂肪： </span>
                <span>{{fat}} </span>
                <span>克</span>
            </div>
            <div class="col-6 food-info-text">
                <span>碳水化合物： </span>
                <span>{{sugar}} </span>
                <span>克</span>
            </div>
            <div class="col-6 food-info-text">
                <span>膳食纖維： </span>
                <span>{{fiber}} </span>
                <span>克</span>
            </div>
            <div class="col-6"></div>

            <div class="col-5 mt-4">
                <button class="btn btn-primary" @click="addToFoodRecord()">新增飲食紀錄</button>
            </div>
            <div class="col-5 mt-4">
                <a class="btn btn-primary" :href="googleMapUrl">Google 地圖</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopName: 'bigreeny 料理．家',
            foodName: '桔醬雞片烙烤吐司套餐',
            location: '新竹市東區金山七街77-1號',
            phoneNumber: '0965106690',
            googleMapUrl: 'https://www.google.com/maps/place/bigreeny+%E6%96%99%E7%90%86%E5%AE%B6/@24.7767683,121.0200837,21z/data=!4m5!3m4!1s0x34683625b9a131d5:0x1a756a1694196533!8m2!3d24.7768622!4d121.0200571',
            calorie: 856,
            price: 104,
            fat: 0,
            sugar: 0,
            fiber: 0,
            imageUrl: 'https://i.imgur.com/C5wnzsw.jpg'
        }
    }, 
    methods: {
        addToFoodRecord() {
            alert("已將餐點加入今日飲食資訊")
        }
    }
}
</script>


<style scoped>

.food-image {
    max-width: 100%;
}

.title-text {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
    text-align: left;
}

.title-text > p {
    margin-bottom: 0px;
}

.food-info-text {
    font-size: 18px;
    text-align: left;
}

</style>