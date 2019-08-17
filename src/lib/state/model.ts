import { UserState } from "../user";
import { ConfigState } from "../config";
import { Language, IntlState } from "../intl"

export type BaseState =  UserState & ConfigState & IntlState & {

  language: Language

}

export const initialBase : BaseState = {
  
  logged: undefined,
  language: Language.en,
  config: undefined,
  intl:undefined

}

