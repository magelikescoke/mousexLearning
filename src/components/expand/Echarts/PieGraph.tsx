import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export interface PieItem {
    value: number,
    name: string
}

export interface PieGraphProps {
    title: string,
    tipTitle: string,
    data: Array<PieItem>,
    width?: string | number,
    height?: string | number,
}

export default function PieGraph(props: PieGraphProps) {

    const baseRef = useRef();

    const option = {
        title: {
            text: props.title,
            left: 'center',
            top: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: props.tipTitle,
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
        <div ref={baseRef} style={{
            width: props.width !== undefined ? props.width : '100%',
            height: props.height !== undefined ? props.height : '5rem'
        }}/>
    );
}