import { i18n } from "i18next";


export enum Language {fr="fr",en="en",ar="ar",zh="zh",es="es",ru="ru"}


export type IntlState = {
  intl: i18n | undefined   
}

export type IntlConfig = {
  intl: {
    languages:string[]
    default: string,
    loadPath: string,
    debug:boolean
  }
}

export const defaultConfig  = {
  
  default: 'en',
  loadPath: 'locale/{{lng}}_{{ns}}.json',
  languages: Object.keys(Language),     // support all languages by default
  debug:false
}


  

