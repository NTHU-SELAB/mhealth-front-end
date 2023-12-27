<style></style>

<template>
  <div class="container">
    <!-- <div id="chat-container" ref="chatMessages"> -->
    <div v-if="chatready" class="chat-messages">
      <div class="col" v-for="message in messages" :key="message.id">
        <div id="response" v-if="message.type === 'bot'" class="bot-response">
          <p class="bot-message" v-html="message.text"></p>
        </div>
      </div>
    </div>
    <div v-else class="text-black text-center">
      <br /><br/>
      <img src="../assets/danceicon.gif">
      <br/><br />
      <h5>
        正在生成報告<br />
        請稍等回覆<br />
        謝謝!
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //ReportType: [String],
    datatype: [String],
    waterData: [Array, String],
    tepData: [Array, String],
    bloodData: [Array, String],
    sportData: [Array, String],
  },
  data() {
    return {
      timedata: [],
      recorddata: [],
      messages: [],
      userMessage: "",
      messageText: "",
      showButton: true,
      chatready: false,
      datax: [],
      datax2: [],
      datay: [],
    };
  },
  created() {
    // async sendMessage() {
    // this.showButton = false;
    if (this.datatype == "water") {
      //console.log(this.waterData);
        var len = this.waterData.length,
        count = 6;
        for (var k = len - 1; k >= 0; k--) {
            this.recorddata[count] = parseInt(this.waterData[k].water);
            if (count > 0 && k == 0) {
                count--;
                while (count >= 0) {
                  this.recorddata[count] = 0;
                  count--;
                }
                break;
            } else if (count == 0 && k >= 0) {
                break;
            }
            count--;
        }
        count = 6;
        for (var j = len - 1; j >= 0; j--) {
            this.timedata[count] = this.waterData[j].time.slice(0, 10);
            if (count >= 0 && j == 0) {
                count--;
                while (count >= 0) {
                  this.timedata[count] = "null";
                  count--;
                }
                break;
            } else if (count == 0 && j >= 0) {
                break;
            }
            count--;
        }
        
        this.messageText =
        "飲水紀錄日期:" +
        this.timedata +
        "當天飲水紀錄:" +
        this.recorddata +
        "這兩個陣列互相對應(飲水時間陣列[0]對應飲水紀錄陣列[0]，每個資料是一天為單位而不是一段時間，同天出現多筆資料請幫我相加)，請幫我根據這資料使用繁體字產出健康建議和報告，將產出健康建議和報告內容都放在<div class='container'>裡面不要額外輸出其他額外文字";
    } else if (this.datatype == "tep") {
      //console.log(this.tepData)
      if (this.tepData == null) {
        //console.log(this.tepData)
        this.recorddata = [0, 0, 0, 0, 0, 0, 0];
        this.timedata = [
          "null",
          "null",
          "null",
          "null",
          "null",
          "null",
          "null",
        ];
        this.datanull = "您近期的體溫資料不足";
      } else {
        len = this.tepData.length;
        count = 6;
        for (var k1 = len - 1; k1 >= 0; k1--) {
          this.recorddata[count] = parseInt(this.tepData[k1].tep);
          if (count > 0 && k1 == 0) {
            count--;
            while (count >= 0) {
              this.recorddata[count] = 0;
              count--;
            }
            break;
          } else if (count == 0 && k1 >= 0) {
            break;
          }
          count--;
        }
        count = 6;
        for (var j1 = len - 1; j1 >= 0; j1--) {
          this.timedata[count] = this.tepData[j1].time.slice(0, 10);
          if (count >= 0 && j1 == 0) {
            count--;
            while (count >= 0) {
              this.timedata[count] = "null";

              count--;
            }
            break;
          } else if (count == 0 && j1 >= 0) {
            break;
          }
          count--;
        }
      }
      //console.log(this.chartData.datasets[0].data)

      this.messageText =
        "體溫紀錄日期:" +
        this.timedata +
        "當天體溫紀錄:" +
        this.recorddata +
        "這兩個陣列互相對應(體溫紀錄日期陣列[0]對應當天體溫紀錄陣列[0]，每個資料是一天為單位而不是一段時間，請幫我根據這資料使用繁體字產出健康建議和報告，將產出健康建議和報告內容都放在<div class='container'>裡面不要額外輸出其他額外文字";
      this.dataready = true;
    } else if (this.datatype == "blood") {
      if (this.bloodData == null) {
        this.datax = [0, 0, 0, 0, 0, 0, 0];
        this.datay = ["null", "null", "null", "null", "null", "null", "null"];
        this.datanull = "您近期的血壓資料不足!";
      } else {
        (len = this.bloodData.length), (count = 6);
        //get the lastest new 7 data algo.(may be better..)
        for (k = len - 1; k >= 0; k--) {
          this.datax[count] = parseInt(this.bloodData[k].dbp);
          this.datax2[count] = parseInt(this.bloodData[k].sbp);
          if (count > 0 && k == 0) {
            count--;
            while (count >= 0) {
              this.datax[count] = 0;
              this.datax2[count] = 0;
              count--;
            }
            break;
          } else if (count == 0 && k >= 0) {
            break;
          }
          count--;
        }
        count = 6;
        for (j = len - 1; j >= 0; j--) {
          this.datay[count] = this.bloodData[j].time.slice(0, 10);
          if (count >= 0 && j == 0) {
            count--;
            while (count >= 0) {
              this.datay[count] = "null";
              count--;
            }
            break;
          } else if (count == 0 && j >= 0) {
            break;
          }
          count--;
        }
      }
      // this.chartData.datasets[0].label = "血壓資料(低)";
      // this.chartData.datasets[1].label = "血壓資料(高)";
      // this.chartData.datasets[1].backgroundColor = "#4363e0";
      // this.chartData.datasets[0].data = this.datax;
      // this.chartData.datasets[1].data = this.datax2;
      // this.chartData.labels = this.datay;
      this.messageText =
        "血壓紀錄日期:" +
        this.datay +
        "當天最高血壓:" +
        this.datax +
        "當天最低血壓:" +
        this.datax2 +
        "這三個陣列互相對應(血壓紀錄日期陣列[0]對應當天最高血壓[0]與與當天最低血壓[0]，每個資料是一天為單位而不是一段時間，請幫我根據這資料使用繁體字產出健康建議和報告，將產出健康建議和報告內容都放在<div class='container'>裡面不要額外輸出其他額外文字";
      // console.log(this.messageText);
      this.dataready = true;
    } else if (this.datatype == "sport") {
      console.log(this.datatype);
      if (this.sportData == null) {
        this.datax = [0, 0, 0, 0, 0, 0, 0];
        this.datay = ["null", "null", "null", "null", "null", "null", "null"];
        this.datanull = "您近期的運動資料不足";
      } else {
        //console.log(this.sportData)
        len = this.sportData.length;
        count = 6;
        for (k1 = len - 1; k1 >= 0; k1--) {
          this.datax[count] = parseInt(this.sportData[k1].car);
          if (count > 0 && k1 == 0) {
            count--;
            while (count >= 0) {
              this.datax[count] = 0;
              count--;
            }
            break;
          } else if (count == 0 && k1 >= 0) {
            break;
          }
          count--;
        }
        count = 6;
        for (j1 = len - 1; j1 >= 0; j1--) {
          this.datay[count] = this.sportData[j1].time.slice(0, 10);
          if (count >= 0 && j1 == 0) {
            count--;
            while (count >= 0) {
              this.datay[count] = "null";
              count--;
            }
            break;
          } else if (count == 0 && j1 >= 0) {
            break;
          }
          count--;
        }
      }
      // this.chartData.datasets[0].label = "運動資料";
      // this.chartData.datasets[0].data = this.datax;
      // this.chartData.labels = this.datay;
      this.dataready = true;
      this.messageText =
        "運動日期:" +
        this.datay +
        "當天卡路里消耗:" +
        this.datax +
        "這兩個陣列互相對應(運動日期[0]對應當天卡路里消耗[0]，每個資料是一天為單位而不是一段時間，請幫我根據這資料使用繁體字產出健康建議和報告，將產出健康建議和報告內容都放在<div class='container'>裡面不要額外輸出其他額外文字";
    }
    console.log("start");
    console.log(this.messageText);

    this.messages.push({ text: this.messageText, type: "user" });
    this.userMessage = ""; // 清空输入框
    // TODO: 发送消息到服务器或聊天API
    // ChatGPT API
    const apiKey = "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"; //zih的key
    const model = "gpt-3.5-turbo";
    // 設定 API 請求選項，包括請求標頭
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // 在這裡放置 API key
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: this.messageText },
          ],
        }),
    };
    // 發送 API 請求
    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            this.chatready = true;
            // 處理 API 響應，顯示 ChatGPT 的回應
            const botReply = data.choices[0].message.content;
            this.messages.push({ text: botReply, type: "bot" });
        })
        .catch((error) => console.error("發送 API 請求時出現錯誤：", error));
  },
};
</script>
