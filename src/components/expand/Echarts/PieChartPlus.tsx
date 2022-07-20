import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// 数据项
export interface PieDataItem {
    // 数值
    value: number,
    // 标题
    name: string
}

export interface PieChartPlusProps {
    // 饼图高度
    height?: string | number,
    // 饼图数据项
    data: Array<PieDataItem>
}


export default function PieChartPlus(props: PieChartPlusProps) {
    // 用于将图标挂载到dom元素上，相当于绑定画布
    const baseRef = useRef();
    const option = {
        // title: {
        //     text: '某站点用户访问来源',
        //     subtext: '纯属虚构',
        //     left: 'center'
        // },
        tooltip: {
            trigger: 'item',
            formatter: `{b}<br/>数量: {c}<br/>占比: {d}%`
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20
            // 指定下标显示顺序
            // data: ['西凉', '益州', '兖州', '荆州', '幽州']
        },
        series: [
            {
                // name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: props.data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
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
        <>
            <div ref={baseRef} style={{ width: '100%', height: props.height ? props.height : '2.8rem' }} />
        </>
    );
}