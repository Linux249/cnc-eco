import { changeBase, CHANGE_BASE } from './actions';
import {urlToBase} from '../util/parseurl.js'

const dumy = "http://cncopt.com/?map=2|N|N|-fix-|20s37w.38y.50e...26p26p26p26p26p42h47s42h.26p52a26p52a26p42h54s42h.26p26p26p26p26p42h46s42h.26p52a26p50a31p40b...31p35p35p38pc.....cc.c.cc.43f.46d..37q..20sj37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy"

let base = urlToBase(dumy);


const initialState = {
  base: base
}


function cncEco(state = initialState, action) {
  switch(action.type) {
    case CHANGE_BASE: 
      return Object.assign({}, state, {
        buildings: state.base.buildings.map((building, index) => {
          if(index === action.base.slot) {
            return Object.assign({}, building, {
              name: action.base.name
            })
          }
          return building
        })
      })
  default:
    return state
  }
}

export default cncEco