import { message, Modal, Progress } from 'dw-mx';
import React, { useEffect, useRef, useState } from 'react';
import { request } from 'dw-mx-request';
// import setPromiseInterval, { clearPromiseInterval } from 'set-promise-interval' 使用promise支持处理定时任务。

/**
 * 进度条组件
 *
 * @param props{"progressUrl"：传入目标进度条URL,closeDialog:关闭模窗口}
 * @author bxj
 * @constructor
 */
// export default function ProgressStace(props) {
const ProgressStace = (props) => {
    const { closeDialog, progressUrl } = props;
    const percentStace = useRef(0.00);
    const percentNum = useRef(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        //初始化进度条
        initProgress();
    }, []);

    const initProgress = async () => {
        if (progressUrl == undefined || progressUrl == '') {
            message.error('获取加载进度条URL路径为空，请联系管理员!');
        }
        //此处轮询处理，1秒请求一次
        const stopStace = setInterval(async () => {
            if (percentStace.current >= 1) {
                clearInterval(stopStace);
                percentStace.current = 0.00;
                closeDialog(true);
            } else {
                const resultData = await request(progressUrl);
                percentNum.current = resultData.current;
                percentStace.current = resultData.percentage;
                setPercent(Math.round((resultData.percentage) * 100));
            }
        }, 1000);
    };

    return (
        <>
            {'已处理【' + percentNum.current + '】条。'}
            <Progress percent={percent} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
        </>
    );
};

export default React.forwardRef(ProgressStace);