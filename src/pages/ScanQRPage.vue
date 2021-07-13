<template></template>

<script>
export default {
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
    alert("QR Code: " + qr_string)
  }
};
</script>

<style>
</style>