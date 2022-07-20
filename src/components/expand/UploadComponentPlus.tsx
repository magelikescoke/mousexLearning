import { createElement } from 'react';
import { message, Upload } from 'dw-mx';
import { request } from 'dw-mx-request';

const h = createElement;

const SUFFIX = /.+(\.\w+)$/,
    BYTE = 1024,
    ACCEPT = {
        // ZIP: 'application/zip,application/x-zip,application/x-zip-compressed',
        ZIP: '.zip,.rar,.7z',
        // PDF: 'application/pdf',
        PDF: '.pdf',
        // EXCEL: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        EXCEL: '.xls,.xlsx',
        // IMAGE: 'image/jpeg,image/bmp,image/png,image/gif',
        IMAGE: '.jpe,.jpeg,.jp2,.jpg,.gif,.png',
        // WORD: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        WORD: '.doc,.docx',
        // PPT: 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation'
        PPT: '.ppt,.pptx',
        TXT: '.txt',
        ALL: '*.*'
    },
    getAccepts = accept => (Array.isArray(accept) ? accept : [accept]).map(ac => ACCEPT[ac]).join(','),
    beforeCheck = (config, file) => {
        let { accept, max = Number.MAX_VALUE } = config || {}, { size, type, name } = file,
            accepts = getAccepts(accept).split(',');
        const split = name.split('.');
        const fileType = split[split.length - 1];
        // 因为具体input accept的类型某些老的文件格式拿不到，座椅采用名称后缀校验
        // if (accepts.indexOf(type) === -1) {
        console.log('');
        if (accepts !== undefined && accepts.length !== 0 && accepts[0] !== '*.*' && accepts.indexOf('.' + fileType) === -1) {
            // message.info(`文件类型为${accept}`);
            message.info(`允许文件类型为${accepts.toString()}`);
            return false;
        }
        //大小限制(M)
        if (Math.pow(BYTE, 2) * max < size) {
            message.info(`文件不能超过${max}M`);
            return false;
        }
    };

const UploadComponentPlus = props => {
    let { children, config } = props, { accept } = config, attrs = {};
    //不能在props对象上直接添加属性，只能再定义一个attrs对象
    Object.assign(attrs, {
        action: '',
        accept: getAccepts(accept),
        beforeUpload: file => beforeCheck(config, file),
        customRequest: opts => {
            let { file, onSuccess, onProgress, onError } = opts, { uid, name, type } = file,
                regExp = /image\/[a-z]{2,4}$/i;
            // name = `${uid}${name.replace(SUFFIX, '$1')}`;
            //判断上传的文件是否是图片，若不是图片，前端可自行根据isImg来控制是否可预览文件
            file.isImg = regExp.test(type);
            const formData = new FormData();
            formData.append('file', file);
            request('/file/upload', formData).then(res => {
                if (res) {
                    if (res['appcode'] === '0') {
                        onSuccess({
                            uid: res['map']['aez040'],
                            name: name,
                            url: res['map']['aez040']
                        });
                        message.success(res['msg']);
                    } else {
                        message.error(res['msg']);
                    }
                } else {
                    message.error('请求失败!');
                }
            });
        }
    });

    return h(Upload, { ...props, ...attrs }, children);
};

export default UploadComponentPlus;