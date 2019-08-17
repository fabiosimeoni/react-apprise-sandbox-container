import * as React from "react"
import { Collapse, Modal } from "antd";

export type ErrorProps = {   
    message:string, 
    title?:string, 
    allowReload?: boolean,
    details?:string, 
    okText?:string,
    onClose?: (close:Function)=>any
} 

export const showError = ( e:Error, props:Partial<ErrorProps> ) => {
    showFailure( { message:e.message, details:(e as any).details || e.stack, ...props} as ErrorProps)
}

export const showFailure = (props:ErrorProps)  => {

    const {title, message, details, allowReload=false, okText, onClose } = props;
                         
    return Modal.error({  
                         title: title || "Oh no, it's a crash.", 
                         onOk : onClose,  
                         cancelText: "Reload",
                       okText,
                       onCancel: ()=>window.location.reload(),
                         okCancel: allowReload,
                         cancelButtonProps: { type:"reload" as any },
                         content:   <Collapse  bordered={false}>
                                        <Collapse.Panel  style={{ whiteSpace: 'pre-wrap' }} header={message} key="1">
                                            {details && details.toString()}
                                        </Collapse.Panel>
                                    </Collapse>
    })
    

}