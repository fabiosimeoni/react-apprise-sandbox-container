import * as React from 'react'
import { Icon, IconType } from './Icon';
import { Link } from 'react-router-dom';

type Props = ActionButtonModel

export const ActionButton = ({iconLeft, icon, title, content, path}:Props) => {

    const Content = () => (
        <div className="action-button">
        {
            content ? content : [
                !content && iconLeft && icon && <Icon icon={icon}/>,
                !content && title,
                !content && !iconLeft && icon && <Icon icon={icon} />
            ]
        }
        </div>
    )
    return path ?
            <Link to="path"><Content/></Link>
        :
            <Content />
}



export type ActionButtonModel = {
    icon?:IconType,
    iconLeft?:boolean
	title?:string,
    onClick?,
    path?:string,
	visible?:boolean,
	disabled?:boolean,
    style?:"default" | "ghost" | "primary" | "dashed" | "danger",
    size?: "default" | "small" | "large",
	content?,
    divider?:boolean,
    actions?: ActionButtonModel[]
}

export const actionButtonDivider = {
	title:'',
	divider:true
} as ActionButtonModel

const flatten = (abs)=>abs.reduce(
    (a, b) => {
        return a.concat((actionButton(b).isGroup() ? flatten(b.actions as ActionButtonModel[]) : b))
    }, []
) as ActionButtonModel[]

export const actionButtons = (abs:ActionButtonModel[]) => ({

    notPrimary: () => actionButtons(abs.filter(b=>!actionButton(b).isPrimary())), 

    primary: () => actionButtons(abs.filter(b=>actionButton(b).isPrimary())),

    flatten: ()=>actionButtons(flatten(abs)),

    visible: ()=>actionButtons(abs.filter(b=>actionButton(b).visible())),

    active: ()=>actionButtons(abs.filter(b=>actionButton(b).active())),
    
	result: abs
})

export const actionButton = (ab:ActionButton) => ({

    isPrimary: () => ab.style === 'primary',

    isGroup: ()=>ab.actions && ab.actions.length > 0,

    visible: ()=>ab.visible===undefined || ab.visible,

    active: ()=>actionButton(ab).visible() && !ab.disabled,
    
    result: ab
    
})