import { List } from 'dw-mx';

import React from 'react';

import './style/index.less';

export interface NoticeListItemData {
    noticeid: string;
    noticeTitle: string;
    noticeType: string;
    sendAccountId: string;
    sendAccountName: string;
    receiveTime: string;
    receiveAccountid: string;
}

export interface NoticeListProps {
    data: NoticeListItemData[];
    onClick?: (item: NoticeListItemData) => void;
    onViewMore?: (e: any) => void;
}
const NoticeList: React.SFC<NoticeListProps> = props => {
    const { data = [], onViewMore, onClick } = props;

    if (!data || data.length === 0) {
        return (
            <div className={'notice-list'}>
                <div className={'notice-list-notfound'}>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg" alt="not found" />
                    <div>你已查看所有通知</div>
                </div>
            </div>
        );
    }
    
    return (
        <div className={'notice-list'}>
            <List
                dataSource={data}
                renderItem={(item, i) => {
                    // eslint-disable-next-line no-nested-ternary
                    return (
                        <List.Item key={item.noticeid} onClick={() => onClick && onClick(item)}>
                            <List.Item.Meta
                                className={'notice-list-item'}
                                title={<div className={'item-title'}>{item.noticeTitle}</div>}
                                description={
                                    <div>
                                        <div className={"item-description"}>{item.sendAccountName}</div>
                                        <div className={"item-timpstamp"}>{item.receiveTime}</div>
                                    </div>
                                }
                            />
                        </List.Item>
                    );
                }}
            />
            <div className={'notice-footer'}>
                <div
                    onClick={e => {
                        alert("查看更多");
                    }}
                >
                    查看更多
                </div>
            </div>
        </div>
    );
};

export default NoticeList;
