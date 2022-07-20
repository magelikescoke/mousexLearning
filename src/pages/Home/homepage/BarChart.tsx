import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts';

export default function BarChart() {

    const baseRef = useRef();

    const option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['北京', '上海', '广东', '江苏', '四川', '辽宁','浙江','山东','湖北','河南'],
                axisTick: {
                    alignWithLabel: true,
                    show:false,
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'月数',
                nameTextStyle:{
                    align:'right'
                },
                axisLine:{
                    show:true,
                },
                splitLine:{
                    show:false
                },
            }
        ],
        series: [
            {
                type: 'bar',
                barWidth: '30%',
                data: [58,54,50,46,42,38,34,30,26,22],
                itemStyle:{
                    normal:{
                        // 渐变色柱图
                        color:new echarts.graphic.LinearGradient(
                            0,1,0,0,
                            [
                                {offset: 0, color: '#38ADE9'},
                                {offset:1,color:'#A6DAF5'}
                            ]
                        )
                    }
                }
            }
        ]
    };


    // 兼容不同分辨率
    useEffect(() => {
        document.documentElement.style.fontSize = '100px';
    })

    const e = (document.documentElement.clientWidth || document.body.clientWidth);
    document.documentElement.style.fontSize = e/1920*100+'px';

    useEffect(() => {
        echarts.dispose(baseRef.current);
        const myChart = echarts.init(document.getElementById('BarChart'));
        myChart.setOption(option);
    }, [option]);
    return (
        <div id={'BarChart'} ref={baseRef} style={{  width:'100%',height:'2.8rem' }}/>
    );
}