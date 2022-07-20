import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import china from './ChinaJson'

export default function ChinaMap() {
    const baseRef = useRef();


    const cities = {
        '北京':[116.20,39.56],
        '上海':[120.52,30.40],
        '广东':[113.23,23.16],
        '江苏':[118.78,32.07],
        '四川':[104.06,30.67],
        '浙江':[120.19,30.26],
        '辽宁':[123.38,41.8],
        '山东':[117,36.65],
        '湖北':[114.31,30.52],
        '河南':[113.65,34.76]
    };
    const cityData = [
        {
            name:'北京',
            value:260
        },
        {
            name:'上海',
            value:240
        },
        {
            name:'广东',
            value:220,
        },
        {
            name:'江苏',
            value:180
        },
        {
            name:'四川',
            value:160
        },
        {
            name: '浙江',
            value:155
        },
        {
            name: '辽宁',
            value:141
        },
        {
            name: '山东',
            value: 120
        },
        {
            name: '湖北',
            value: 120
        },
        {
            name: '河南',
            value: 120
        }
    ];


    const convertData = (data) => {
        const res = [];
        for (let i = 0; i < data.length; i++) {
            const city = cities[data[i].name];
            if (city) {
                res.push({
                    name: data[i].name,
                    value: city.concat(data[i].value)
                });
            }
        }
        return res;
    };

    const option = {

        //提示框组件
        tooltip: {
            trigger: 'item',
            backgroundColor:'rgba(255, 255, 255, .9)',
            borderColor:'rgba(255, 255, 255, .9)',
            textStyle:{
              fontSize:12,
                color:'#333333'
            },
            extraCssText:'box-shadow: 0 0.03rem 0.06rem rgba(0, 0, 0, .16);border-radius: 0.04rem;width: 1.10rem;height: 0.83rem;',
            formatter:(params) => {
                if(params.data){
                    let indexTop;
                    const name = params.data.name;
                    const value = params.data.value[2];
                    cityData.sort((a,b) => {
                        return b.value - a.value
                    }).forEach((value,index) => {
                        if(value.name === name){
                            indexTop = index+1
                        }
                    })
                    return '<div> <div style="margin-bottom: 0.05rem">地区：'+name+'</div> <div style="margin-bottom: 0.05rem">机构数量：'+value+'</div> <div>全国排名：'+indexTop+'</div></div>'
                }else{
                    return ''
                }
                
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                // 普通状态下的样式
                normal: {
                    areaColor: '#e3e3e3',
                    borderColor: '#fff'
                },
            },
        },
        series: [
            {
                type: 'scatter',          // series图表类型
                coordinateSystem: 'geo',  // series坐标系类型
                data: convertData(cityData),  // series数据内容
                //series样式
                itemStyle: {
                    normal: {
                        color: '#ffd470',
                        borderColor:'#ffbb00'
                    }
                },
                symbolSize: function(val) {//根据数值大小控制点的大小
                    return val[2] / 20;
                }
            },
            {
                type: 'scatter',          // series图表类型
                coordinateSystem: 'geo',  // series坐标系类型
                data: convertData(cityData.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 3)),  // series数据内容
                //series样式
                itemStyle: {
                    normal: {
                        color: '#ff7070',
                        borderColor:'#ff0000'
                    }
                },
                symbolSize: function(val) {//根据数值大小控制点的大小
                    return val[2] / 20;
                },
                zlevel: 1
            }
        ]
    };

    useEffect(() => {
        document.documentElement.style.fontSize = '100px';
    })

    const e = (document.documentElement.clientWidth || document.body.clientWidth);
    document.documentElement.style.fontSize = e/1920*100+'px';

    useEffect(() => {
        echarts.dispose(baseRef.current);
        echarts.registerMap('china',china)
        const myChart = echarts.init(baseRef.current);
        myChart.setOption(option);
    }, [option]);
    return (
        <div ref={baseRef} style={{width:'7.5rem', height:'6rem' }}/>
    );
}