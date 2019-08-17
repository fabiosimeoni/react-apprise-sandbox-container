import * as React from "react"
import { Button } from "../Button";


type Props = {

  name:string
  primary?: boolean
  icon?: string
  task: ()=>any

}


export const Action = ({name,primary=false,task,icon}:Props) => {

  return <div className={'action' + (primary?' primary':'')} >
            <Button title={name} onClick={task} icon={icon}/>    
  </div>


}