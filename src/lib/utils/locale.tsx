import {Language} from "../intl"

import enUS from "antd/es/locale/en_US"
import frFR from "antd/es/locale/fr_FR"
import caES from "antd/es/locale/ca_ES"
import ruRU from "antd/es/locale/ru_RU"
import zhCN from "antd/es/locale/zh_CN"
import arEG from "antd/es/locale/ar_EG"


export const localeFrom = (lang:Language)  => {

  switch(lang) {

    case Language.en: return enUS
    case Language.fr: return frFR
    case Language.es: return caES
    case Language.ar: return arEG
    case Language.ru: return ruRU
    case Language.zh: return zhCN

    default: throw new Error(`Unsupported language '${lang}'`);
  }

}