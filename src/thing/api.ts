import { callapi, change, through } from "../lib";
import { State } from "../state";
import { randomThing, Thing } from "./model";


const fetch = (state: State) => () : Promise<Thing[]> => {

  console.log("fetching things...")
  return callapi(state).at("/thing").get().then(through(set(state)))
};

const set = (state: State) => (things:Thing[]) => {

  change(state).with(draft=> draft.things=things );
}

const all = (state: State) => () => {
  return state.things;
};
const addRandom = (state: State) => () => {
  add(state)(randomThing());
};

const add = (state: State) => (t: Thing) => {
  change(state).with(draft => draft.things.push(t));
};

export const thingapi = (s: State) => ({

  fetch: fetch(s),

  set: set(s),
  add: add(s),
  addRandom: addRandom(s),
  all: all(s)
});
