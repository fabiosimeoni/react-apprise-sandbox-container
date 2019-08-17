import { Button, Empty } from "antd";
import Title from "antd/lib/typography/Title";
import * as React from "react";
import { baseapi, connect, randomNumber, randomUser, userapi } from "../lib";
import { State } from "../state";
import { Language } from "../lib/intl";
import { useTranslation } from "react-i18next";


const randomChange = (lang:Language) : Language =>  {

  const keys = Object.keys(Language)
  var newlang = lang;
  while (newlang=== lang){
    newlang = Language[keys[randomNumber(keys.length)]]
  }
  return newlang;
}

const $Home = ( state: State) => {

  const {t} = useTranslation();
  const base = baseapi(state);
  const users = userapi(state);

  return (
      <>
        <Title>{t("home.title")}</Title>
        <br/>
        <Empty/>
        <br/>
        <Button onClick={()=>users.set(randomUser())}>{t("home.login")}</Button>
        &nbsp;&nbsp;
        <Button onClick={()=>base.setLanguage(randomChange(base.language()))}>{t("home.change language")}</Button>
      </>
  )
}


export const Home = connect($Home);