import * as React from "react"
import {BaseState } from "../../../lib"
import { connect } from "../../state";
import { Login } from "../Login";
import { Layout } from "antd";

type Props =  BaseState & {}

const $Header = ( props:Props) => {


  return <Layout.Header style={{ textAlign: "right",  background: '#fff', padding: 0 }} >
            <Login /> 
        </Layout.Header>



}

export const Header = connect($Header, state => state.logged )