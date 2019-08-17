import { IntlConfig } from "../intl";


export enum Mode { dev="dev", prod="prod"}

export type BaseConfig = IntlConfig & {
  mode: Mode
  services: { [key: string]:ServiceConfig }
}

export type ConfigState = {
  config:BaseConfig
}

export type ServiceConfig = {

  prefix: string
  default?: boolean

}
