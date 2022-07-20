import React, { useState } from 'react';
import { Switch } from 'dw-mx';
import { request } from 'dw-mx-request';

interface SwitchPlusProps {
    // 初始时开关的状态
    enabled: boolean,
    // 请求后台控制开关值变化的接口
    url: string,
    // 该条开关记录数据的id
    id: string | number
}

export default function SwitchPlus(props: SwitchPlusProps) {

    const [enabled, setEnabled] = useState(props.enabled);
    return (
        <>
            <Switch checkedChildren='启用' unCheckedChildren='停用'
                    checked={enabled}

                    onClick={(checked, event) => {
                        request(props.url, { userid: props.id, enabled: checked }).then(res => {
                            setEnabled(checked);
                        });
                    }}
            />
        </>
    );
}