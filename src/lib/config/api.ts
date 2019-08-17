import { callapi } from "../api";
import { BaseState, change } from "../state";
import { failWith, through } from "../utils";
import { BaseConfig, ServiceConfig } from "./model";

const getModel = (state:BaseState) => () => state.config || failWith("no configuration available yet")
const setModel = (state:BaseState) => (c: BaseConfig) => change(state).with( s => s.config = c )

const isDefined = (state:BaseState) => () => state.config !== undefined



const fetch = (state:BaseState) => (): Promise<BaseConfig> => {

  console.log("loading configuration...")

   return callapi(state).staticAt("config.json").get()
                      .then(through(validate))
                      .then(through(setModel(state)))

}




const validate = (config:BaseConfig) => {

  try {
    config.services || failWith("no services defined")


  }
  catch(e) {
    failWith(`configuration is invalid: ${e}.`)
  }
}


export const service = ({services}:BaseConfig) => (name:string) => {

  const service = services[name]
  
  if (!service) 
    throw new Error(`unknown service '${name}'`);

  return service;
}

export const defaultService = ({services}:BaseConfig) => () : ServiceConfig => {
  
  for (let k in services)
    if (services[k].default)
      return services[k]
  

  const keys = Object.keys(services)

  if (keys.length === 1)
    return services[keys[0]]
  
  throw new Error("no default service!"); 

}

const stateapi = (s: BaseState ) => ({

  isDefined: isDefined(s),
  getModel : getModel(s),
  get: () => modelapi(getModel(s)()),
  set: setModel(s),
  fetch: fetch(s)

})

const modelapi =  (c:BaseConfig) => ({

  service: service(c),
  defaultService: defaultService(c),

  intl: () => c.intl
})

export type ConfigStateApi = typeof stateapi
export type ConfigModelApi = typeof modelapi

export const configapi = {

  givenState : stateapi,
  givenModel: modelapi
}
