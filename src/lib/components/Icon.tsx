import * as React from 'react'
import { Icon as AntdIcon} from 'antd'

export type IconType = string | JSX.Element

type Props = {
    icon: IconType,
    theme?:"filled" | "outlined" | "twoTone"
}

export const Icon = ({icon, theme}:Props) => {
    return typeof icon === 'string' ? <AntdIcon type={icon} theme={theme} /> : icon
}