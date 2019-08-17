
export type ValOrGen<T> = T | (() => T)

export const asGenerator = (v:any) : Function => (typeof v === "function") ? v : () => v

export const wait = <T> (ms:any) => (x:T) => new Promise<T>(v => setTimeout(() => v(x), ms));

export  const randomNumber = (range : number=100) => 
  Math.floor(Math.random() * range)

export  const random = (thing:string, range : number=100) => 
  thing + randomNumber(range)

export const failWith = (msg:any) => {
  throw msg;
}

export const through = <T> (fn:(t:T)=>any) => (a:T) :Promise<T> => {
  fn(a);    // process side-effects
  return Promise.resolve(a); // pass the data further
 };

