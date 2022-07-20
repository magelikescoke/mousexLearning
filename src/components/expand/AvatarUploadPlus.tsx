import React, { useEffect, useState } from 'react';
import { message, Modal, Upload, Form, Input } from 'dw-mx';
import { PlusOutlined } from '@ant-design/icons';
import { request } from 'dw-mx-request';
import common from '@/pages/common/common';

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传JPEG或者PNG类型的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
};

interface Img {
    imgNum: number,
    imgUrl: string,
    // Form.useForm创建的实例
    form: any,
    // form表单中存储上传文件id的字段名
    fileID: string,
    // 照片是否不能修改
    disabled: boolean
}

export default function AvatarUploadPlus(img: Img) {

    const [imgInfo, setImgInfo] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: ''
    });

    const [fileList, setFileInfo] = useState([]);

    const handleCancel = () => {

        setImgInfo({
            previewVisible: false,
            previewTitle: '',
            previewImage: ''
        });
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setImgInfo({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        });

    };

    const handleChange = ({ fileList }) => {
        setFileInfo([...fileList]);
        if (fileList.length > 0) {
            if (fileList[0]['response']) {
                img.form.setFieldsValue({
                    ...img.form.getFieldsValue(),
                    [img.fileID]: fileList[0]['response']['map']['map']['aez040']
                });
            }
        } else {
            img.form.setFieldsValue({
                ...img.form.getFieldsValue(),
                [img.fileID]: undefined
            });
            setFileInfo([]);
        }
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传照片</div>
        </div>
    );

    // 初始化加载照片的方法
    // useEffect(() => {
    //     setFileInfo([{
    //         uid: '-1',
    //         name: 'image.png',
    //         status: 'done',
    //         url: '/file/getImg?aez040=e0055c697295481ab6a56a7186c840d3'
    //     }]);
    // }, []);
    // 初始化的加载方法;
    useEffect(() => {
        if (img.form.getFieldValue(img.fileID) !== undefined) {
            // console.log('Test====>>>》》');
            // request('/file/getImg?aez040=' + img.form.getFieldValue(img.fileID)).then(res => {
            //     console.log('Res===》》》', res);
            //     if (res) {
            //         if (res['appcode'] === '0') {
            //             const file = res['map']['ez04'];
            //             if (file !== null) {
            //                 const tempList = [{
            //                     uid: file['aez040'],
            //                     name: file['aez041'],
            //                     url: file['aez040']
            //                 }];
            //                 setFileInfo(tempList);
            //             }
            //         } else {
            //             message.error(res['msg']);
            //         }
            //     } else {
            //         message.error('请求失败!');
            //     }
            // });
            const tempList = [{
                uid: img.fileID,
                name: '照片',
                url: common.imgBaseUrl + '/file/getImg?aez040=' + img.form.getFieldValue(img.fileID)
            }];
            setFileInfo(tempList);
        }
    }, [img.form.getFieldValue(img.fileID)]);
    // }, []);

    return (
        <>
            <Form.Item name={img.fileID} hidden>
                <Input />
            </Form.Item>
            <Upload
                action={img.imgUrl}
                listType='picture-card'
                fileList={fileList}
                beforeUpload={beforeUpload}
                onPreview={handlePreview}
                onChange={handleChange}
                disabled={img.disabled}
            >
                {fileList.length >= img.imgNum ? null : uploadButton}
            </Upload>
            <Modal
                visible={imgInfo.previewVisible}
                title={imgInfo.previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt='example' style={{ width: '100%' }} src={imgInfo.previewImage} />
            </Modal>
        </>
    );
}