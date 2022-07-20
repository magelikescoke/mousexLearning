import { Button, Form, message, Modal, Row, Upload } from 'dw-mx';
import { UploadOutlined } from 'dw-mx-icons';
// import { request } from 'dw-mx-request';
import React, { useState } from 'react';
import { Dialog } from 'dw-mx-extend';
import ProgressStace from './ProgressStace';
import { request } from 'dw-mx-request';

/**
 * 上传公共组件
 *
 * @param props{"targetUrl"：传入目标上传url, [param]：上传的其他入参, closeModal:关闭模窗口, returnData:上传成功后返回数据}
 * @author bxj
 * @constructor
 */
export default function UploadModal(props) {
    const { closeModal, targetUrl, params, returnData, progressUrl } = props;
    const dialogRef = React.createRef<Dialog>();
    const [form] = Form.useForm();
    const param = params ? params : {};
    let uploadResultData = [];

    const doUpload = async () => {
        const values = form.getFieldsValue();
        const formData = new FormData();

        if (values.datafile != undefined) {
            const name = values['datafile'][0].name;

            if (name.indexOf('.xls') !== -1) {
                //获取上传文件中datafile并请求后台转换处理
                formData.append('datafile', values['datafile'][0].originFileObj, values['datafile'][0].name);
                for (const key in param) {
                    formData.set(key, param[key]);
                }
                request(targetUrl, formData, { timeout: 1000 * 60 * 5 }).then((res) => {
                    uploadResultData = res;
                    returnData(uploadResultData);
                    message.info('上传成功!');
                    closeModal(false);
                });

                // 同步查询进度条状态
                const dialog = await dialogRef.current.openDialog(ProgressStace, {
                    width: '30%',
                    closable: false,
                    props: {
                        progressUrl: progressUrl
                    }
                });
            } else {
                message.warn('请上传表格格式的文档！');
            }
        } else {
            message.warn('请先上传报盘文件再点击上传按钮!');
        }
    };

    const [uploadState, setUploadState] = useState({
        disabled: false,
        fileList: []
    });
    const doReset = () => {
        setUploadState({
            disabled: false,
            fileList: []
        });
        form.resetFields();
    };

    const doCancel = async () => {
        closeModal(false);
    };

    return (
        <>
            <Modal
                title={'导入文件'}
                visible={true}
                maskClosable={false}
                width={window.innerWidth * 0.3}
                onCancel={doCancel}
                style={{ height: window.innerHeight * 0.3, marginTop: '1.5rem' }}
                className={'dw-mx-modal'}
                footer={
                    <Row gutter={15} justify={'center'} align={'middle'}>
                        <Button type={'primary'} onClick={doUpload}>上传</Button>
                        <Button onClick={doReset}>重置</Button>
                        <Button onClick={() => {
                            doCancel();
                        }}>关闭</Button>
                    </Row>
                }
            >
                <Form form={form}>
                    <Form.Item
                        name='datafile'
                        label='报盘文件'
                        valuePropName='fileList'
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                    >
                        <Upload
                            beforeUpload={(file) => false}
                            disabled={uploadState.disabled}
                            fileList={[...uploadState.fileList]}
                            onChange={(item) => {
                                const filelistlength = item.fileList.length;
                                if (filelistlength >= 1 && uploadState.disabled === false) {
                                    setUploadState({
                                        disabled: true,
                                        fileList: item.fileList
                                    });
                                }
                            }}
                        >
                            <Button disabled={uploadState.disabled}>
                                <UploadOutlined /> 选择上传的文件
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
                <Dialog ref={dialogRef}></Dialog>
            </Modal>
        </>
    );
}