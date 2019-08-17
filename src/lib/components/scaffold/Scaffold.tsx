
import { ConfigProvider, Layout } from "antd";

import 'antd/dist/antd.css';

import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { baseapi, BaseState, connect } from "../../state";
import { localeFrom } from "../../utils";

import { ScaffoldModel } from "./model";
import { SideBar } from "./SideBar";
import './styles.scss';
import { Header } from "./Header"


type Props = BaseState & {

   model : ScaffoldModel

}

const $Scaffold = (props: Props ) => {
  
  const { model } = props
  const { Content } = Layout

  const api = baseapi(props);
  const locale = localeFrom(api.language())

  return ( 
  
      <ConfigProvider locale={locale}>
        <Router>

            <Layout style={{ minHeight: '100vh' }}>

              <SideBar model={model} />
            
              <Layout>
                
                <Header />
                
                <Content style={{ textAlign: "center", padding: 24, background: '#fff'}}>
               
                    <Switch>
                    {model.sections.map( (s,i) => 
                      <Route exact={s.route.exact} path={s.route.path} key={i} component={s.content} />
                      )}
                        <Route render={()=><span>what?</span>} />
                    </Switch>
               
                </Content>

              </Layout>
        </Layout>
    
      </Router>
    </ConfigProvider>
  )

}

export const Scaffold = connect($Scaffold)