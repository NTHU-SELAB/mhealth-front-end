<template>
    <div id="landing-page" :style="{opacity: allOpacity}">
        <div>
            <h1 class="display-4 title mb-4" :style="{opacity: titleOpacity, 'padding-top': '233px'}">{{title}}</h1>
            <!-- <hr class="my-4"> -->
            <h3 class="mt-4 mb-4" style="font-weight: bold;">您的最佳健康助手</h3>
            <button class="btn btn-primary btn-lg mt-4 startbutton"
                    :style="{opacity: startButtonOpacity, 'margin-bottom': '245px'}"
                    @click="start()">
                    立即開始
            </button>
        </div>
    </div>
</template>

<script>
// 吾健康網頁 之 開始畫面
export default {
    data() {
        return {
            title: '健談HealthTalker',
            allOpacity: 0,
            titleOpacity: 100,
            startButtonOpacity: 0 
        }
    },
    mounted() {
        setTimeout(() => {
            this.allOpacity = 100;
            this.isAllShow = true;
        }, 200)
        // setTimeout(() => {
        //     this.titleOpacity = 0;
        // }, 1400)
        // setTimeout(() => {
        //     this.titleOpacity = 100;
        //     this.title = '';
        // }, 2400)
        setTimeout(() => {
            this.startButtonOpacity = 100;
        }, 1000)
    },
    methods: {
        start() {
            const p = this.$route.params.userID
            this.$router.push(`/food-calendar-web/${p}`)
        }
    }
}

</script>

<style scoped>

#landing-page {
    background-image:url('../assets/landing-background.jpeg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    transition-property: opacity;
    transition-duration: 1.2s;
    transition-timing-function: ease-in-out;
    color: white;
}

#landing-page::before {
    background: rgba(0, 0, 0, 0.3);
}


.title {
    transition-property: opacity;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
    font-weight: bold;
}

.startbutton {
    transition-property: opacity;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
}
</style>