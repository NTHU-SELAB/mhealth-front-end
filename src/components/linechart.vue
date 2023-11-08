<template>
    <div class="container">
        <LineChartGenerator
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
        />
        <p>{{ this.datanull }}</p>
    </div>
    
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)

export default {
    name: 'LineChart',
    components: {
        LineChartGenerator
    },
    props: {
        bloodData:[Array,String],
        sportData:[Array,String],
        foodData:[Array,String],
        datatype:[String],
        chartId: {
            type: String,
            default: 'line-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => {}
        },
        plugins: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'low blood pressure',
                        backgroundColor: '#FFB1C1',
                        data: [40, 39, 10, 40, 39, 80, 40],
                        borderColor: '#FF6384',
                    },
                    {
                        label: '',
                        backgroundColor: '',
                        borderColor: '#157d34',
                        data: []
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 200,
                        ticks: {
                            stepsize: 30,
                            maxtickslimit: 3
                        }
                    }
                }
            },
            datax:[],
            datax2:[],
            datay:[],
            datanull:"",
            dataready:false,
            foodshow:""
        }
    },
    created() {
        console.log(this.datatype)
        var k1,j1;
        if(this.datatype=="blood"){
            if(this.bloodData==null){
                this.datax=[0,0,0,0,0,0,0];
                this.datay=['null','null','null','null','null','null','null'];
                this.datanull="您近期的血壓資料不足!";
            }else{
                var len=this.bloodData.length,count=6;
                //get the lastest new 7 data algo.(may be better..)
                for(var k=len-1;k>=0;k--){
                    this.datax[count]=parseInt(this.bloodData[k].dbp);
                    this.datax2[count]=parseInt(this.bloodData[k].sbp);
                    if(count>0 && k==0){
                        count--;
                        while(count>=0){
                            this.datax[count]=0;
                            this.datax2[count]=0;
                            count--;
                        }
                        break;
                    }else if(count==0 && k>=0){
                        break;
                    }
                    count--;
                }
                count=6;
                for(var j=len-1;j>=0;j--){
                    this.datay[count]=this.bloodData[j].time.slice(0,10);
                    if(count>=0 && j==0){
                        count--;
                        while(count>=0){
                            this.datay[count]="null";
                            count--;
                        }
                        break;
                    }else if(count==0 && j>=0){
                        break;
                    }
                    count--;
                }
            }
            this.chartData.datasets[0].label="血壓資料(低)";
            this.chartData.datasets[1].label="血壓資料(高)";
            this.chartData.datasets[1].backgroundColor="#51ed80"
            this.chartData.datasets[0].data=this.datax;
            this.chartData.datasets[1].data=this.datax2;
            this.chartData.labels=this.datay;
            this.dataready=true;
        }else if(this.datatype=="sport"){
            console.log(this.datatype)
            if(this.sportData==null){
                this.datax=[0,0,0,0,0,0,0];
                this.datay=['null','null','null','null','null','null','null'];
                this.datanull="您近期的運動資料不足"
            }else{
                //console.log(this.sportData)
                len=this.sportData.length;
                count=6;
                for(k1=len-1;k1>=0;k1--){
                    this.datax[count]=parseInt(this.sportData[k1].car);
                    if(count>0 && k1==0){
                        count--;
                        while(count>=0){
                            this.datax[count]=0;
                            count--;
                        }
                        break;
                    }else if(count==0 && k1>=0){
                        break;
                    }
                    count--;
                }
                count=6;
                for(j1=len-1;j1>=0;j1--){
                    this.datay[count]=this.sportData[j1].time.slice(0,10);
                    if(count>=0 && j1==0){
                        count--;
                        while(count>=0){
                            this.datay[count]="null";
                            count--;
                        }
                        break;
                    }else if(count==0 && j1>=0){
                        break;
                    }
                    count--;
                }
            }
            this.chartData.datasets[0].label="運動資料";
            this.chartData.datasets[0].data=this.datax;
            this.chartData.labels=this.datay;
            this.dataready=true;
        }else if(this.datatype=="cal"){
            console.log(this.datatype)
            if(this.foodData==null){
                this.datax=[0,0,0,0,0,0,0];
                this.datay=['null','null','null','null','null','null','null'];
                this.datanull="您近期的運動資料不足"
            }else{
                //console.log(this.sportData)
                len=this.foodData.length;
                count=80;
                for(k1=len-1;k1>=0;k1--){
                    this.datax[count]=parseInt(this.foodData[k1].cal);
                    if(count>0 && k1==0){
                        count--;
                        while(count>=0){
                            this.datax[count]=0;
                            count--;
                        }
                        break;
                    }else if(count==0 && k1>=0){
                        break;
                    }
                    count--;
                }
                count=80;
                for(j1=len-1;j1>=0;j1--){
                    //this.datay[count]=this.foodData[j1].time.slice(0,10);
                    this.datay[count]=count;
                    if(count>=0 && j1==0){
                        count--;
                        while(count>=0){
                            this.datay[count]="null";
                            count--;
                        }
                        break;
                    }else if(count==0 && j1>=0){
                        break;
                    }
                    count--;
                }
            }
            this.chartData.datasets[0].label="卡洛里紀錄";
            this.chartData.datasets[0].data=this.datax;
            this.chartData.labels=this.datay;
            this.chartOptions.scales.y.max=5000;
            this.dataready=true;
        }
    }
}
</script>
  