<template>
<div id="scan-qr-page" class="container">
</div>
</template>

<script>
export default {
  data() {
      return {
        qr_string: "qrcode"
      }
  },

  mounted() {
    if (liff.scanCode) {
      liff.scanCode().then((result) => {
        qr_string = result.value
        alert("QR Code: " + qr_string)
      });
    }
  }
}
</script>

<style>
</style>