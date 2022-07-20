import React from 'react';
import './style/index.less';
import MXLayout from '@/layouts/MXLayout';


export interface BasicLayoutProps {
    logo: any;
    route: any;
    title: string;
}

const BasicLayout: React.FunctionComponent<BasicLayoutProps> = (props) => {
    const { route, logo, title } = props;
    return (
        <MXLayout
            route={route}
            logo={logo}
            title={title}
        />
    )
};

export default BasicLayout;
