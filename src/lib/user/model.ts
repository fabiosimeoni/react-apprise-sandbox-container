import { random } from "../utils";


export type User = {
  username: String;
};

export type UserState = {
  logged: User;
};

export const randomUser = () : User => 
  ({ username : random("user") } )
    
