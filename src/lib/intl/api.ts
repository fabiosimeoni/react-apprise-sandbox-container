import i18next from "i18next";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import { configapi } from "../config";
import { BaseState, change } from "../state";
//import { storage } from "../utils";
import { defaultConfig } from "./model";


const stateapi = (s:BaseState) => ({

  isInitialized: () => stateapi(s).getModel() !== undefined,
  init: init(s),

  setModel: (intl:i18next.i18n) => change(s).with(draft => draft.intl=intl),
  getModel: () => s.intl


})


export const intlapi = {

   givenState: stateapi

}

//  individual functions


//const defaultkey = 'defaultLanguage'
//const i18nStorage = storage(defaultkey)

var i18n = undefined;


const init = (state:BaseState) => () => {

  console.log("initialising intl...")

  const config = configapi.givenState(state).get();

  const conf = { ...defaultConfig, ...config.intl() }

  
  const deflang = conf.default //i18nStorage.get() || conf.default
  
  const path = `${config.service("self").prefix}/${conf.loadPath}`

  var error: any = undefined;

  return i18next
   .use(XHR)
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
       // both seem required even if there's no language detection
       lng: deflang,          
       fallbackLng: deflang,  
       react: {
        useSuspense: false
      },

       debug:conf.debug,
       backend: { loadPath: path },
       interpolation: {  escapeValue: false } // react already safe from XSS
   
    }, 
      //  throwing errors from here won't propagae to thenables (must be caught)
      //  so we track the error manually and throw from the first thenable.
      e => { if (e) error = new Error(e)}   
      ).then(()=> { if (error) throw error })
 
    .then(()=>stateapi(state).setModel(i18next))
}

