export const storage = (key?:string) => ({

  set: value => key && localStorage.setItem(key, value),

  get: () => key && localStorage.getItem(key),

  remove: () => key && localStorage.removeItem(key),

  // remove all
  clean: () => localStorage.clear()
})