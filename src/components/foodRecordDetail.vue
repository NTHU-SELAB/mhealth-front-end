<template>
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">4 / 20 晚餐 ： 牛排</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-6 food-record-detail">
                    <div>時段：晚餐</div>
                    <div>名稱：牛排</div>
                    <div>重量：250g</div>
                </div>
                <div class="col-6 food-record-detail">
                    <div>脂肪：33g</div>
                    <div>卡路里：553 大卡
                    </div>
                    <div>膳食纖維：0g</div>
                    <div>碳水化合物：0g</div>
                </div>
                <div class="col-12 food-record-detail">記錄時間：4 / 20 18:06</div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
        </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style scope>
.food-record-detail {
    text-align: left;
    font-size: 14px;
}
</style>