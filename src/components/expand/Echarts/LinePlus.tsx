import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface LinePlusProps {
    // X轴条目数组
    // 数据格式：['2016','2017','2018']
    xData: Array<string>,
    // Y轴的数据类型
    // 数据格式： [['留学',2,3,4],['赴台',1,2,3]]
    yData: Array<Array<string | number>>
    // y轴Title
    yTitle: string,
    // 高度
    height?: string
}

export default function LinePlus(props: LinePlusProps) {

    const baseRef = useRef();
    // 组装X轴条目数据
    let xName = ['product'];
    xName = xName.concat((props.xData ? props.xData : []));
    // 拼装数据源
    const dataSource = [];
    // 拼装数据显示类型
    const seriesSource = [];
    dataSource.push(xName);
    //组装Y轴数据类型
    (props.yData ? props.yData : []).forEach(item => {
        dataSource.push(item);
        seriesSource.push({ type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } });
    });
    // 设置配置项
    const option = {
        legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: true
        },
        dataset: {
            // 数据源
            source: dataSource
        },
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            name: props.yTitle,
            gridIndex: 0,
            axisLine: { show: true }
        },
        grid: { top: '25%' },
        series: seriesSource
    };

    useEffect(() => {
        document.documentElement.style.fontSize = '100px';
    });

    const e = (document.documentElement.clientWidth || document.body.clientWidth);
    document.documentElement.style.fontSize = e / 1920 * 100 + 'px';

    useEffect(() => {
        echarts.dispose(baseRef.current);
        const myChart = echarts.init(baseRef.current);
        // myChart.on('updateAxisPointer', function(event) {
        //     const xAxisInfo = event.axesInfo[0];
        //     if (xAxisInfo) {
        //         const dimension = xAxisInfo.value + 1;
        //         myChart.setOption({
        //             series: {
        //                 id: 'pie',
        //                 label: {
        //                     formatter: '{b}: {@[' + dimension + ']} ({d}%)'
        //                 },
        //                 encode: {
        //                     value: dimension,
        //                     tooltip: dimension
        //                 }
        //             }
        //         });
        //     }
        // });
        myChart.setOption(option);
    }, [option]);

    return (
        <>
            <div ref={baseRef} style={{ width: '100%', height: props.height ? props.height : '2.5rem' }} />
        </>
    );
}