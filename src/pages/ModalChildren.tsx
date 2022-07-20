import React from "react";
import { Modal } from "dw-mx";
export default function ModalChildren(props) {
    const { templateContent,onOk, onCancel,onUpdate } = props;
    let {str} = props
    const onModalOk = function(){
        onUpdate('更新后');
        alert(typeof str)
        alert(str)
        str = 's'
        onOk();
    }
    const onModalCancel = function(){
        onCancel();
    }

    return (<Modal
        title={'展示窗口'}
        visible = {true}
        onOk = {onModalOk}
        onCancel = {onModalCancel}
    >
        {templateContent}
    </Modal>)
}