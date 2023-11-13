<template>
    <div class="container">
        <Bar
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
import { Bar } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    components: { Bar },
    props: {
        waterData:[Array,String],
        tepData:[Array,String],
        Data:[Array,String],
        datatype:[String],
        chartId: {
            type: String,
            default: 'bar-chart'
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
    data(){
        return {
            chartData: {
                labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
                ],
                datasets: [
                    {
                        label: 'data',
                        backgroundColor: '#9BD0F5',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            datax:[],
            datay:[],
            datanull:"",
            dataready:false
        }
    },
    created() {
        if(this.datatype=="water"){
            //console.log(this.waterData)
            if(this.waterData==null){
                //console.log(this.waterData)
                this.datax=[0,0,0,0,0,0,0];
                this.datay=['null','null','null','null','null','null','null'];
                this.datanull="您近期的飲水資料不足"
            }else{
                //this part should be refactoring if have time
                var len=this.waterData.length,count=6;
                for(var k=len-1;k>=0;k--){
                    this.datax[count]=parseInt(this.waterData[k].water);
                    if(count>0 && k==0){
                        count--;
                        while(count>=0){
                            this.datax[count]=0;
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
                    this.datay[count]=this.waterData[j].time.slice(0,10);
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
            this.chartData.datasets[0].label="飲水資料"
            this.chartData.datasets[0].data=this.datax;
            this.chartData.labels=this.datay;
            //console.log(this.chartData.labels)
            this.dataready=true;
        }else if(this.datatype=="tep"){
            //console.log(this.tepData)
            if(this.tepData==null){
                //console.log(this.tepData)
                this.datax=[0,0,0,0,0,0,0];
                this.datay=['null','null','null','null','null','null','null'];
                this.datanull="您近期的體溫資料不足"
            }else{
                //console.log(this.tepData)
                len=this.tepData.length
                count=6;
                for(var k1=len-1;k1>=0;k1--){
                    this.datax[count]=parseInt(this.tepData[k1].tep);
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
                for(var j1=len-1;j1>=0;j1--){
                    this.datay[count]=this.tepData[j1].time.slice(0,10);
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
            this.chartData.datasets[0].label="體溫資料"
            this.chartData.datasets[0].data=this.datax;
            this.chartData.labels=this.datay;
            //console.log(this.chartData.datasets[0].data)
            this.dataready=true;
        }
    }
}
</script>

<style scoped>
</style>