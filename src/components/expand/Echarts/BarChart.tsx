import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export interface BarChartProps {
    // x轴标题
    xTitle?: string,
    // y轴标题
    yTitle?: string,
    // x轴条目数组
    xData: Array<string>,
    // y轴数据数组
    yData: Array<number>,
    // 图标高度
    height?: string | number
    // 图标宽度
    width?: string | number,
    // tip面板标题
    tipTitle?: string
}


export default function BarChart(props: BarChartProps) {

    const baseRef = useRef();

    const option = {
        tooltip: {},
        grid: {
            left: '3%',
            right: '10%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: [
            {
                name: props.xTitle ? props.xTitle : '',
                type: 'category',
                // data: ['一月', '二月', '三月', '四月', '五月', '六月'],
                data: props.xData,
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                nameTextStyle: {
                    color: '#666666'
                }
            }
        ],
        yAxis: [
            {
                name: props.yTitle ? props.yTitle : '',
                type: 'value',
                axisLine: {
                    show: true
                },
                splitLine: {
                    show: false
                },
                nameTextStyle: {
                    color: '#666666'
                }
            }
        ],
        series: [
            {
                name: props.tipTitle ? props.tipTitle : '',
                type: 'bar',
                barWidth: '20%',
                // data: [200, 1150, 1540, 800, 2100, 3400],
                data: props.yData,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                { offset: 0, color: '#38ADE9' },
                                { offset: 1, color: '#A6DAF5' }
                            ]
                        )
                    }
                }
            }
        ]
    };

    useEffect(() => {
        document.documentElement.style.fontSize = '100px';
    });

    const e = (document.documentElement.clientWidth || document.body.clientWidth);
    document.documentElement.style.fontSize = e / 1920 * 100 + 'px';

    useEffect(() => {
        echarts.dispose(baseRef.current);
        const myChart = echarts.init(baseRef.current);
        myChart.setOption(option);
    }, [option]);
    return (
        <div ref={baseRef}
             style={{ width: props.width ? props.width : '100%', height: props.height ? props.height : '2.8rem' }} />
    );
}