import { State } from "../state";
import { configapi as base } from "../lib/config"
import { Config } from "../config";


const get = (s:State) => () => {

   return base.givenState(s).getModel() as Config;
}

export const configapi = (s: State) => ({

    get : get(s)
 
})