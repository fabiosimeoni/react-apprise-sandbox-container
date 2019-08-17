import * as React from 'react'

import {Link} from 'react-router-dom'


import { Icon } from 'antd';

type LogoProps = {
    title: string,
    icon: string|JSX.Element,
    color: string
}

export const Logo = ({title, icon, color}:LogoProps) => (
    <Link to="/">
    <div className="logo" style={{background:color}}>
        {typeof icon === 'string' ? <Icon type={icon}/> : icon}
        <div className="title">{title}</div>
    </div>
    </Link>
)