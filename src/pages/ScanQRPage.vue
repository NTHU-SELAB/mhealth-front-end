<template>
<div id="scan-qr-page" class="container">
  123456
</div>
</template>

<script>
export default {
  name: 'ScanQR',
  components:{},
  data() {
      return {
        qr_string: "qrcode"
      }
  },

  mounted() {
    // if (liff.scanCode) {
    //   liff.scanCode().then((result) => {
    //     qr_string = result.value
    //     alert("QR Code: " + qr_string)
    //   });
    // }
    alert("QR Code: " + this.qr_string)
  }
};
</script>

<style>
</style>