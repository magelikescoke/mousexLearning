import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts';

export default function LineChart() {

    const baseRef = useRef();

    const option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2020.09', '2020.10', '2020.11', '2020.12', '2021.01', '2021.02'],
            axisTick: {
                alignWithLabel: true,
                show:false,
            },
            nameTextStyle:{
                color:'Rgb(103,192,102)'
            }
        },
        yAxis: {
            type: 'value',
            name:'地区数',
            data:[0,5,10,15,20,25,30,35],
            nameTextStyle:{
                align:'right'
            },
            // 是否显示坐标轴轴线
            axisLine:{
                show:true,
            },
            // 是否显示y轴分割线
            splitLine:{
                show:false
            },
        },
        series: [{
            data: [33,24,27,24,30,18],
            type: 'line',
            symbolSize:8,
            lineStyle:{
                color:'Rgb(103,192,102)'
            },
            itemStyle:{
                color:'Rgb(103,192,102)'
            }
        }]
    };

    // 兼容不同分辨率
    useEffect(() => {
        document.documentElement.style.fontSize = '100px';
    })

    const e = (document.documentElement.clientWidth || document.body.clientWidth);
    document.documentElement.style.fontSize = e/1920*100+'px';

    useEffect(() => {
        echarts.dispose(baseRef.current);
        const myChart = echarts.init(baseRef.current);
        myChart.setOption(option);
    }, [option]);
    return (
            <div id={'AreaChart'} ref={baseRef} style={{width:'100%',height:'2.8rem' }}/>

    );
}