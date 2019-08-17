import { callapi } from "../api";
import { BaseState, change } from "../state";
import { User } from "./model";

const set = (state:BaseState) => (user : User) => change(state).with(draft => draft.logged=user)
 
const isLogged = (state:BaseState) => () => {
  return state.logged !== undefined;
};

const fetchLogged = (state:BaseState) => ()  => {
  
  console.log("fetching logged user...")

  return callapi(state).at("/logged").get<User>().then(set(state))

}


export const userapi = (s: BaseState) => ({
  set: set(s),
  isLogged: isLogged(s),
  fetchLogged: fetchLogged(s)
});