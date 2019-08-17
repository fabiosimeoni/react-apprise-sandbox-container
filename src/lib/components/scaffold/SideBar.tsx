import { Icon, Layout, Menu } from "antd";
import * as React from "react";
import {  Route, Switch, NavLink } from "react-router-dom";
import { ScaffoldModel } from "./model";
import { Logo } from "./Logo";
import { PageSider } from "./PageSider";


type Props = {

    model: ScaffoldModel

}

export const SideBar = ( {model}:Props ) => {

  const { Sider } = Layout

 return (
 
    <div className="sidebar">
     <Sider width={230} collapsible defaultCollapsed={false}>     
      
       <Logo icon={model.icon} color={model.color} title={model.title}/>
       
        <div className="sidebar-content">
      
                 
        <div className="iconbar" >
          <Sider  collapsed>
            <Menu theme="dark" mode="inline" selectable={false}>
              { model.sections.map ((section,i) => 
                
                  <Menu.Item key={i}>
                      <NavLink exact={section.route.exact} to={section.route.path} activeClassName="active">
                        <Icon type={section.icon} />
                        <span>{section.name}</span>
                      </NavLink>
                  </Menu.Item>  )}
            </Menu>
          </Sider>
        </div>

        <Switch>  {model.sections.map( (s,i) => 
            <Route exact={s.route.exact} path={s.route.path} key={i} component={s.sidebar || PageSider} />
          )}
        </Switch>
        
      </div> 

    </Sider>
  </div>
 )

}



