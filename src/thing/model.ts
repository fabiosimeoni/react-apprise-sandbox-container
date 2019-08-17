import { random } from "../lib/utils";

export type Thing = {
  name: String;
};

export type ThingState = {
  things: Thing[] | undefined;
};

export const initialThings: ThingState = { things: undefined };

export const randomThing = () => ({ name: random("thing") });
