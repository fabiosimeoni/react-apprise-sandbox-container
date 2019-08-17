import * as React from "react";
import { connect, BaseState } from "../state";
import { Avatar } from "antd";

const $Login = (state: BaseState) => {
  return <div>
            <Avatar size="small" icon="user" />
            <span style={{padding:5}}> {state.logged.username}</span>
          </div>;
};

export const Login = connect( $Login, state => state.logged );
