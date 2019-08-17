import * as React from "react";
import { Action, connect, PageSider } from "../../lib";
import { State } from "../../state";
import { thingapi } from "../../thing";



const $ThingBar = (state:State) => {

  const api = thingapi(state)

  return <PageSider title="Things">
    < Action primary name="Add random" icon="plus-square" task={api.addRandom} />
    < Action name="Other" icon="plus-square" task={()=>{}} />
    < Action name="Yet Another" icon="plus-square" task={()=>{}} />
  
  </PageSider>
} 


export const ThingBar = connect($ThingBar)