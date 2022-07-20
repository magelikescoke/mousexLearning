import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Popover } from 'dw-mx';
import UploadComponentPlus from '@/components/expand/UploadComponentPlus';
import { request } from 'dw-mx-request';
import './style/index.less';

export interface FUProps {
    // Form.useForm创建的实例
    form: any,
    // form表单中存储上传文件id的字段名
    fileID: string,
    // 上传button的提醒面板内容Popover（可以使用简单的html标签布局）
    popTitle: any
    // 是否隐藏上传按钮
    hidden: boolean,
    // 上传文件类型
    // accept: 'zip' | 'pdf' | 'excel' | 'image' | 'word' | 'ppt',
    accept: Array<'ALL' | 'ZIP' | 'PDF' | 'EXCEL' | 'IMAGE' | 'WORD' | 'PPT' | 'TXT'> | 'ZIP' | 'PDF' | 'EXCEL' | 'IMAGE' | 'WORD' | 'PPT' | 'ALL' | 'TXT'
    // 上传文件最大大小（MB）
    max: number,
    // 是否必传
    required?: boolean,
    // 控制下拉列表初始化的state的状态
    isChange: any
}

export default function FormUpload(props: FUProps) {
    // 下载面板list
    const [fileList, setFileList] = useState([]);

    // 上传文件配置
    const config = {
        // accept: 'zip',   //接受上传的文件类型：zip、pdf、excel、image，也可以是文件类型所组成的数组类型如：['image', 'pdf']，则只可以上传图片或pdf类型的文件，也可以不传或为空或为'*'，则任何类型的文件都可以上传
        // max: 1    //限制上传文件大小
        accept: props.accept,
        max: props.max
    };
    // 点解下载链接后的触发方法
    const onPreview = async file => {
        request.download('/file/download?aez040=' + file['uid'] + '&aez041=' + file['name'], {});
    };
    // 上传成功后的触发方法
    const onSuccess = res => {
        setFileList([res]);
        props.form.setFieldsValue({ ...props.form, [props.fileID]: res['uid'] });
    };
    // 删除方法
    const onRemove = (file) => {
        // 暂时缺少接口
        console.log('remove ----> ', file);
    };

    // 初始化的加载方法
    useEffect(() => {
        if (props.form.getFieldValue(props.fileID)) {
            request('/file/getFileInfo?id=' + props.form.getFieldValue(props.fileID)).then(res => {
                if (res) {
                    if (res['appcode'] === '0') {
                        const file = res['map']['ez04'];
                        if (file !== null) {
                            const tempList = [{
                                uid: file['aez040'],
                                name: file['aez041'],
                                url: file['aez040']
                            }];
                            setFileList(tempList);
                        }
                    } else {
                        message.error(res['msg']);
                    }
                } else {
                    message.error('请求失败!');
                }
            });
        }
    }, [props.form.getFieldValue(props.fileID) || props.isChange]);

    return (
        <>
            <Form.Item name={props.fileID} hidden>
                <Input />
            </Form.Item>
            <UploadComponentPlus listType={'text'} config={config} fileList={fileList} onSuccess={onSuccess}
                                 onRemove={onRemove}
                // 由于onSuccess方法中没有将以前的list值存储下来，而采用替换，所以fileList只存在一个值，不会存在button消失的情况（即三元运算不会返回null），此处场景应用于上传一定数量文件后隐藏button
                                 onPreview={onPreview}>{fileList.length >= 2 ? null :
                !props.hidden &&
                // <Popover content={props.popTitle}>
                <Popover content={
                    <div style={{
                        width: '300px',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'normal'
                    }}>
                        {props.popTitle}
                    </div>
                }>
                    <div>
                        {
                            (props.required !== undefined ? props.required : false) &&
                            <span style={{
                                fontSize: '14px',
                                display: 'inline-block',
                                marginRight: '4px',
                                color: '#ff4d4f',
                                fontFamily: 'SimSun, sans-serif',
                                lineHeight: 1
                            }}>*</span>
                        }
                        <Button>上传</Button>
                    </div>
                </Popover>
            }
            </UploadComponentPlus>
        </>
    );
}