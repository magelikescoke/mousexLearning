import React, { useEffect } from 'react';
import { ColFlex, FlexItem, RowFlex } from 'dw-mx-flex';
import LineChart from '@/pages/home/homepage/LineChart';
import BarChart from '@/pages/home/homepage/BarChart';
import NumberNav from './NumberNav'
import ChinaMap from '@/pages/home/homepage/ChinaMap';
import {CheckSquareTwoTone,CloseSquareTwoTone} from 'dw-mx-icons'


export default function HomeIndex() {
    // 兼容不同分辨率屏幕
    useEffect(() => {
        document.documentElement.style.fontSize = '100px';
    })

    const e = (document.documentElement.clientWidth || document.body.clientWidth);
    document.documentElement.style.fontSize = e/1920*100+'px';

    return (
        <>
        <div style={{backgroundColor:'rgb(235,238,245)'}}>
            <RowFlex style={{height:'1.40rem'}}>
                {/* 本月已上报数据统计 */}
                <FlexItem style={{marginRight:'0.1rem',backgroundColor:'#fff',paddingBottom:'0.2rem'}}>
                    <ColFlex>
                        <div style={{height:'0.35rem',lineHeight:'0.35rem',paddingLeft:'0.19rem',borderBottom:'0.01rem solid #e2e2e2',fontWeight:800,marginBottom:'0.2rem'}}>
                            本月已上报数据统计
                        </div>
                        <FlexItem>
                            <RowFlex>
                                <FlexItem style={{borderRight:'0.01rem solid #e2e2e2'}}>
                                    <NumberNav title={'总条数'} number={'40,265'}/>
                                </FlexItem>
                                <FlexItem style={{borderRight:'0.01rem solid #e2e2e2'}}>
                                    <NumberNav title={'单位总数'} number={'1,365'}/>
                                </FlexItem>
                                <FlexItem>
                                    <NumberNav title={'人员总数'} number={'40,265'}/>
                                </FlexItem>
                            </RowFlex>
                        </FlexItem>
                        
                    </ColFlex>
                </FlexItem>
                {/* 快捷入口 */}
                <FlexItem style={{marginLeft:'0.1rem',backgroundColor:'#fff',paddingBottom:'0.2rem'}}>
                    <ColFlex>
                        <div style={{height:'0.35rem',lineHeight:'0.35rem',paddingLeft:'0.19rem',borderBottom:'0.01rem solid #e2e2e2',fontWeight:800,marginBottom:'0.2rem'}}>
                            快捷入口
                        </div>
                        <div>
                            <div style={{float:'left',textAlign:'center',padding:'0.05rem 0.1rem'}}>
                                <CheckSquareTwoTone style={{fontSize:'0.35rem'}}/>
                                <div style={{fontSize:'0.1rem'}}>
                                    全国工资结构分析
                                </div>
                            </div>
                            <div style={{float:'left',textAlign:'center',padding:'0.05rem 0.1rem'}}>
                                <CloseSquareTwoTone style={{fontSize:'0.35rem'}}/>
                                <div style={{fontSize:'0.1rem'}}>
                                    全国地区分析对比
                                </div>
                            </div>
                        </div>
                    </ColFlex>
                </FlexItem>
            </RowFlex>
            <RowFlex style={{marginTop:'0.2rem',height:'6.8rem'}}>
                {/* 全国各地数据上报情况 */}
                <FlexItem style={{backgroundColor:'#fff',marginRight:'0.1rem'}}>
                    <ColFlex>
                        <div style={{height:'0.35rem',lineHeight:'0.35rem',paddingLeft:'0.19rem',borderBottom:'0.01rem solid #e2e2e2',fontWeight:800}}>
                            全国各地数据上报情况
                        </div>
                        <FlexItem>
                            <RowFlex>
                                <FlexItem >
                                    <ChinaMap/>
                                </FlexItem>
                            </RowFlex>
                        </FlexItem>
                    </ColFlex>
                </FlexItem>
                {/* 近6个月上报情况 */}
                <FlexItem style={{marginLeft:'0.1rem'}}>
                    <ColFlex >
                        <FlexItem style={{backgroundColor:'#ffffff',marginBottom:'0.1rem'}}>
                            <div style={{height:'0.35rem',lineHeight:'0.35rem',paddingLeft:'0.19rem',borderBottom:'0.01rem solid #e2e2e2',fontWeight:800}}>
                                近6个月上报情况
                            </div>
                            <LineChart/>
                        </FlexItem>
                        <FlexItem style={{backgroundColor:'#ffffff',marginTop:'0.1rem'}}>
                            <div style={{height:'0.35rem',lineHeight:'0.35rem',paddingLeft:'0.19rem',borderBottom:'0.01rem solid #e2e2e2',fontWeight:800}}>
                                各地数据上报排名Top10
                            </div>
                            <BarChart/>
                        </FlexItem>
                    </ColFlex>
                </FlexItem>
            </RowFlex>
            </div>
        </>
    );
}