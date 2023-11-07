<template>
    <div>
        <nav-bar/>
        <h3><strong>健康新聞查詢</strong></h3>
        <div class="container">
            <div class="input-group mb-3">
                <button type="button" class="btn btn-danger p-2" v-on:click="cleansearch">
                    <i class="bi bi-house"></i>
                </button>
                <input class="form-control mr-sm-2 p-2" v-model="search" placeholder="輸入癌症/疫苗/血壓等關鍵字...">
                <button type="button" class="btn btn-primary p-2" v-on:click="changeurl">
                <i class="bi bi-search"></i>
                </button>
            </div>
            <strong>{{ this.sword }}</strong>
        </div>
        <div class="container p-3 overflow-auto img-max" style="height: 800px; background-color: rgba(232, 225, 225, 0.8);">
            <div v-if="showdiv" class="container">
                <div class="row justify-content-md-center">
                    <div v-bind:key="x.key" v-for="x in this.content" class="col-sm-6 d-grid">
                        <div class="card p-4 mb-3" >
                            <div class="card-body">
                                <h3 class="card-title text-info"><strong>{{ x.title }}</strong></h3>
                                <h6 class="card-subtitle mb-2 text-success"><strong>{{ x.date }}</strong></h6>
                                <div class="card-text" v-html="x.content"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div v-else class="text-black text-center">
                <br><br><br><div class="spinner-border text-black"></div><br>
                <h5>API正在更新資料<br>
                請稍後再重新整理頁面<br>
                謝謝!</h5>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
var loopi=10;
export default {
    data(){
        return{
            data:[{
                "內容":"",
                "標題":"",
                "發布日期":""
            }],
            content:[],
            title:[],
            date:[],
            search: '',
            url:"https://www.hpa.gov.tw/wf/newsapi.ashx?startdate=2020/1/1",
            showdiv:false,
            sword:"尚未查詢",
            
        }
    },
    created() {
        axios.get(this.url)
            .then((res) => {
            this.data = res.data;
            for(var i=0;i<loopi;i++){
                //if(this.data[i]['內容'].includes("contentImg")) continue;
                this.data[i]['內容'] = this.data[i]['內容'].replace(/<img[^>]*>/g,"");
                this.content.push({"key":i,"date":this.data[i]['發布日期'],"title":this.data[i]['標題'],"content":this.data[i]['內容']})
            }
            this.showdiv=true;
            //console.log(this.content);
        }).catch((error) => {
            console.error("An error occurred:", error);

        });
    },
    methods: {
        changeurl(){
            this.showdiv=false;
            var u=this.url+"&keyword="+this.search;
            //console.log(u);
            this.content=[];
            axios.get(u)
                .then((res) => {
                this.data = res.data;
                if(this.data.length != 0){
                    if(this.data.length<10) loopi=this.data.length;

                    for(var i=0;i<loopi;i++){
                        //if(this.data[i]['內容'].includes("contentImg")) continue;
                        this.data[i]['內容'] = this.data[i]['內容'].replace(/<img[^>]*>/g,"");
                        this.content.push({"key":i,"date":this.data[i]['發布日期'],"title":this.data[i]['標題'],"content":this.data[i]['內容']})
                        //console.log(this.content);
                    
                    }
                    this.showdiv=true;
                    if(this.search==""){
                        this.sword="尚未查詢";
                    }else{
                        this.sword="以下為 " + this.search + " 的查詢結果";
                    }
                    loopi=10;
                }else{
                    this.showdiv=true;
                    if(this.search==""){
                        this.sword="尚未查詢";
                    }else{
                        this.sword="查無結果";
                    }
                }
                
                //console.log(this.content);
            }).catch((error) => {
                console.error("An error occurred:", error);
            });
        },
        cleansearch(){
            this.search="";   
            this.changeurl();    
        }
    },
}
</script>

<style>
.htmlImgWrap {
  max-width: 500px;
}
</style>
