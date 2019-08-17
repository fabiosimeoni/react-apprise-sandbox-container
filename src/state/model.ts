import { BaseState, initialBase } from "../lib";
import { ThingState, initialThings } from "../thing/model";

export type State = BaseState & ThingState;

export const state : State = { ...initialBase, ...initialThings };
