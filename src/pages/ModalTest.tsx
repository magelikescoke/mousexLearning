import { Button } from "dw-mx";
import { useModal } from "dw-mx-hooks";

import React,{ useState } from "react";
import ModalChildren from "./ModalChildren";
import ModalChildrenTwo from "./ModalChildrenTwo";

export default function ModalTest () {
    const [templateContent, updateTemplateContent] = useState('初始值')
    const [visible, openFun, closeFun] = useModal()
    const [visibleTwo, openFunTwo, closeFunTwo] = useModal()
    let str = '123'

    return (
        <>
            <Button
                onClick={()=>{
                    updateTemplateContent('Hello World!')
                    openFun()
                }}>弹窗1</Button>
              <Button
                onClick={()=>{
                    str = 'o2'
                    // updateTemplateContent('Hello World2!')
                    openFunTwo()
                }}>弹窗2</Button>  
                {
                    visible && <ModalChildren
                    templateContent = {templateContent}
                    onOk={()=>{
                        closeFun();
                        alert(str)
                    }}
                    onCancel={()=>{
                        closeFun();
                    }}
                    onUpdate={
                        updateTemplateContent
                    }
                    str = {str}
                    ></ModalChildren> 
                }
                {
                    visibleTwo && <ModalChildrenTwo
                    templateContent = {templateContent}
                    onOk={()=>{
                        closeFunTwo();
                    }}
                    onCancel={()=>{
                        closeFunTwo();
                    }}
                    onUpdate={
                        updateTemplateContent
                    }
                    str = {str}

                    ></ModalChildrenTwo>
                    
                }
                <div>{templateContent}{`str:${str}`}</div>
        </>
    )
}