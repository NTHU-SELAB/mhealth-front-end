<template>
    <div>
        <video ref="video" width="640" height="480" class="col-12" autoplay playsinline >
        </video>
    </div>
</template>

<script>
export default {
    
    data() {
        return {

        }
    },

    mounted() {
        this.openCamera()
    },

    methods: {

        openCamera() {
            let video = this.$refs.video
            navigator.mediaDevices.getUserMedia(
                { video: true}).then( (stream) => {
                video.srcObject = (stream);
                // this.temp = window.URL.createObjectURL(stream).substring(5);
                video.play();
            })
        },

        getVideoImage(){
            const video = document.getElementById('video')
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d');
            video.width = 640 
            video.height = 480
            const width = video.width
            const height = video.height
            canvas.width = width
            canvas.height = height
            context.drawImage(video,0,0,width,height,0,0,width,height)
            return canvas.toDataURL("image/png").substr(22);
        },
    }



}
</script>

<style>

</style>