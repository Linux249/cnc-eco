import {layoutStats }from './utils/layout'
console.log(typeof layoutStats)
console.log(layoutStats)
console.log(layoutStats(""))

const base = "...................t.c.t.c....c.t....t.c.t.............c...c.c.........."
console.log("............................................................................................................".length)
const {tib, cris} = layoutStats(base)
console.log({tib, cris})
