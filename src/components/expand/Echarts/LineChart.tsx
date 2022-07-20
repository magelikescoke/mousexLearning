import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export interface LineChartProps {
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

export default function LineChart(props: LineChartProps) {
    const baseRef = useRef();

    const option = {
        tooltip: {
            trigger: 'axis',
            showContent: true,
            // formatter: `<strong>{b}年</strong><br/>数量: {c}个`
        },
        grid: {
            left: '3%',
            right: '10%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            name: props.xTitle ? props.xTitle : '',
            type: 'category',
            axisLine: {
                show: true
            },
            data: props.xData
        },
        yAxis: {
            name: props.yTitle ? props.yTitle : '',
            type: 'value',
            axisLine: {
                show: true
            }
        },
        series: [{
            data: props.yData,
            type: 'line',
            smooth: true
        }]
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
        <>
            <div ref={baseRef}
                 style={{
                     width: props.width ? props.width : '100%',
                     height: props.height ? props.height : '2.8rem'
                 }} />
        </>
    );
}