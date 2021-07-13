<template>
<div id="scan-qr-page" class="container">
  <span id="demo-span">{{ qr_string }}</span>
</div>
</template>

<script>
import liff from '@line/liff'

export default {
  data() {
    return {
      qr_string: "qrcode"
    }
  },

  mounted() {
    liff.init({ liffId: 'myLiffId' });

    // alert("liff.scanCode: " + liff.scanCode)
    if (liff.scanCode) {
      liff.scanCode().then(result => {
        this.qr_string = JSON.stringify(result)
      }).catch(err => {
        this.qr_string = err.stringify()
      });
    }
    else {
      alert(liff.scanCode)
    }
  }
}
</script>

<style>
</style>