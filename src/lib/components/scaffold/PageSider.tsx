import * as React from "react" 

type Props = {
  title:string
  children:any
}

export const PageSider = ({title,children}:Props) => {


  return <div className="pagesider">
      <div className="title">{title}</div>
      {children}
  </div>
}