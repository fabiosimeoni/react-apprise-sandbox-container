import { BaseState } from "./model";
import { change } from "./helpers";
import { intlapi, Language } from "../intl";


export const baseapi = (s:BaseState) => ({

  language: () => s.language,

  setLanguage: (l:Language) => {

    intlapi.givenState(s).getModel().changeLanguage(l)
    change(s).with(draft=>draft.language=l)
  
  }
  
})