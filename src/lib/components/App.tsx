import MockAdapter from "axios-mock-adapter";
import * as React from "react";
import { mock } from "../api";
import { configapi, Mode } from "../config";
import { intlapi, Language } from "../intl";
import { BaseState, StateProvider, useCreateState, useLoadingEffect } from "../state";
import { userapi } from "../user";
import { ErrorBarrier } from "./misc";
import { Spinner } from "./Spinner";
import { useTranslation } from "react-i18next";

import "./styles.scss";



type Props = {
  initState:BaseState
  mockery: (mock:MockAdapter)=>void
  children: React.ReactElement
}



// HOC to boostrap and uniformly style an application
export const App = ({initState, mockery, children}:Props) => {
  
  const state = useCreateState(initState); 

  const users = userapi(state);
  const config = configapi.givenState(state);
  const intl = intlapi.givenState(state); 

  // sets up mockery, fetches config when undefined, removes mock if in production
  useLoadingEffect( { 
            unless: config.isDefined(), 
           task: () => Promise.resolve(mockery(mock))  
                          .then(config.fetch)
                          .then( c=> c.mode===Mode.prod && mock.restore() ),
            error:"Can't load configuration."
  })


  
    // initialise locales, provided config is defined
   useLoadingEffect( { 
            when: config.isDefined(),
            unless: intl.isInitialized(), 
           task: () => intl.init(),
            error:"Can't initialize internationalisation."
})
                  
    // fetches logged user if not available and provided config is defined
  useLoadingEffect( {
            when: config.isDefined(),
            unless: users.isLogged(), 
           task: () => users.fetchLogged(),
            error:"Can't fetch info about the logged user."
    })

 // selecting a new language may trigger a small delay
 // we could ignore it altogether, but it may be a problem over time
 // render if we have the basics in place, also if language is not ready
 const ready = users.isLogged() && config.isDefined() && intl.isInitialized();

return (
  
      <ErrorBarrier>
        <StateProvider value={state} >
            <Spinner className="covering" showOn={!ready}>  
                <LanguageLoader>
                    {children}
               </LanguageLoader>
            </Spinner> 
        </StateProvider>
      </ErrorBarrier>

  )
}


//  little trick to have a spinner when language loads, without preventing
//  rendering of children, which creates a flash of content or worse.

const LanguageLoader = (props:any) => {
    
    // use hook just to force language loading
    const {ready} = useTranslation();
  
    // render always, even when not ready
    return <Spinner className="covering" showOn={!ready} renderIf={true}>  
          {props.children}
      </Spinner> 
}