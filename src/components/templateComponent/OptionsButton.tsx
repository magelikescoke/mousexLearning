import React from 'react';
import { Space } from 'dw-mx';

// 注意启用行选的时候要屏蔽table子组件的点击事件，避免其传给父组件导致同时触发行选（以下代码可屏蔽点击事件）
// event.stopPropagation();
export interface OptionButtonItem {
    // 按钮标题
    title: string,
    // button的点击触发事件
    option: (event?: any) => void
}

export interface OptionsButtonProps {
    buttonList: Array<OptionButtonItem>
}

export default function OptionsButton(props: OptionsButtonProps) {

    return (
        <>
            <Space style={{ fontSize: '14px' }} key={'optionsSpace'}>
                {
                    props.buttonList.map((value, index) => {
                        if (index === 0) {
                            return (
                                <a
                                    onClick={value.option} key={'indexA' + index}
                                >
                                    <span>{value.title}</span>
                                </a>
                            );
                        } else {
                            return (
                                <Space key={'innerSpace' + index}>
                                    <span key={'indexSpan' + index}>|</span>
                                    <a onClick={value.option} key={'indexA' + index}><span>{value.title}</span></a>
                                </Space>
                            );
                        }
                    })
                }
            </Space>
        </>
    );
}
