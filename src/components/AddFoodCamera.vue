<template>
    <div id="add-food-camera">
        <div class="row justify-content-center" style="margin-top: 80px;">
            <div class="col-4 open-camera-button"><a href="line://nv/camera">拍攝照片</a></div>
            <div class="col-1"></div>
            <div class="col-4 open-camera-button"><a href="line://nv/cameraRoll/single">相簿上傳</a></div>
        </div>
        <button class="btn btn-danger" @click="closeWindow">closeWindow</button>
    </div>
</template>

<script>

export default {
    name: 'AddFoodCamera',
    components: {

    },

    methods: {
        closeWindow() {
            liff.closeWindow()
        }
    }

}
</script>

<style>
#add-food-camera {
    margin-top: 30px;
}

.open-camera-button {
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
}

.open-camera-button > a{
    text-decoration: none;
    color: white;
}

.open-camera-button > a:hover{
    text-decoration: none;
    color: white;
}

</style>
