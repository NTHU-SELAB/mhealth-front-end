<template>
<div id="scan-qr-page" class="container">
  <span id="demo-span">{{ qr_string }}</span>
  <br>
  <span id="demo-span">{{ debug_text }}</span>
</div>
</template>

<script>
import liff from '@line/liff'

export default {
  data() {
    return {
      qr_string: "qrcode",
      debug_text: ""
    }
  },

  mounted() {
    liff.init({liffId: '1653910104-zxd7QNxL'}).then(() => {
      this.debug_text = "Initialization successful!"

      if (!liff.isLoggedIn()) {
        liff.login().then(() => {
          this.Scan()
        })
      }
      else {
        this.Scan()
      }
    })
  },

  methods: {
    Scan: function() {
      if (liff.scanCode) {
        liff.scanCode().then(result => {
          this.qr_string = JSON.stringify(result)
          liff.closeWindow()
        }).catch(err => {
          this.qr_string = 'Error: ' + err.stringify()
        })
      }
      else {
        this.qr_string = 'undefined'
        liff.closeWindow()
      }
    }
  }
}
</script>

<style>
</style>