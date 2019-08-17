import * as React from "react";
import { showError } from "../utils";


//  manageses loadng state on behalf of a task
export const useLoadingEffect = ({unless=false,when=true,task,error}: loadDirectives ) => {

  const [loading,setLoading] = React.useState(false);
  const [failed,setFailed] = React.useState(false);

  // eslint-disable-next-line
  React.useEffect( () => {
    
    if (loading || failed || unless || !when ) 
           return

    
     Promise.resolve(setLoading(true))
           .then( task )
           .catch(e=> {
              showError(e,{title:error, okText:"Retry", onClose: close=> { setFailed(false); close() }})
              setFailed(true);
           })
           .then(()=>setLoading(false))
        
  });

  return loading;
}



export type loadDirectives = {

  unless?: boolean,
  when?: boolean,
  error: string,
  task: () => Promise<any>
}