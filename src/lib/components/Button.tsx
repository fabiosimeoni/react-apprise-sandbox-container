import * as React from 'react'
import {Button as Btn} from 'antd'
import { ActionButtonModel, actionButton } from './ActionButton';
import { Icon } from './Icon';
import { Link } from 'react-router-dom';
import { BaseButtonProps } from 'antd/lib/button/button';

type Props = ActionButton & {
    className?
}

type ButtonProps = BaseButtonProps & {
    disabled?
    onClick?
}

const BtnCmp = Btn as React.ComponentClass<ButtonProps>

export const Button = (button:Props) => {
    const {icon, iconLeft, title, style, size, onClick, path, disabled, className} = button
    
    const Button = ()=>(
        <BtnCmp
            className={className}
            type={style}
            size={size}
            onClick={onClick}
            disabled={disabled?true:false}>

            {icon && iconLeft && <Icon icon={icon}/>}
            {title}
            {icon && !iconLeft && <Icon icon={icon}/>}

        </BtnCmp>
    )
    
    return (
        actionButton(button).isGroup() ?
        <Btn.Group size={size}>
            {
                (button.actions as ActionButtonModel[])
                .map((b, bi)=><Button key={bi} {...b}/>)
            }
        </Btn.Group>
        :
        path ? <Link to={path}><Button/></Link> : <Button/>
    )
}
