import React from "react";
import { Modal } from "dw-mx";
export default function ModalChildrenTwo(props) {
    const { templateContent,onOk, onCancel,onUpdate } = props;
    const onModalOk = function(){
        onUpdate('更新后2');
        onOk();
    }
    const onModalCancel = function(){
        onCancel();
    }

    return (<Modal
        title={'展示窗口2'}
        visible = {true}
        onOk = {onModalOk}
        onCancel = {onModalCancel}
    >
        {templateContent}
    </Modal>)
}