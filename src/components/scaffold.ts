
import { ScaffoldModel } from "../lib"
import { Things } from "./things/Things";
import { Home } from "./Home";
import { ThingBar } from "./things/ThingBar"

export const scaffold : ScaffoldModel = {
  title:"Embryo",
  icon:"ant-design",
  color: "#00bcd4",
  sections: [
    { 
      name:"Home",
      icon:"home", 
      title: "Home",
      route:{path:"/", exact:true},
      content: Home,
      sidebar: null
    },{   
      name:"Things",
      icon:"pie-chart", 
      title: "Many Things",
      route:{path:"/things/",exact:false},
      content: Things,
      sidebar: ThingBar
    }
  
  ]
}

