import React from 'react';

import "./style/index.less"

interface LogoAreaProps {
    logo: string;
    title: string;
}

export default function LogoArea(props: LogoAreaProps) {
    const { logo } = props;

    return (
        <div className={"clpc-logoarea"}>
            <img src={logo} alt="logo"/>
            <span style={{color: "#fff",fontSize:'18px'}}>人事人才管理信息系统-人力资源市场管理服务子系统</span>
        </div>
    );
}