//import { combineReducers } from 'redux';

import { menu }from './menu';
//
//
// /**
//  * Reducers
//  */
// export const reducers = menu
//
//
// /**
//  * Reducer class call
//  *
//  * @param state
//  * @param action
//  * @param reducerClass
//  * @returns {*}
//  */
// export function reducerCall(state, action, reducerClass) {
//     // get the action class method
//     console.log("AKTIONTYPE: "+ action.type)
//     //console.log(action.type)
//     const [, method] = action.type.split('.');
//     // get all class methods
//     const methods = Object.getOwnPropertyNames(reducerClass).filter(name => {
//         //console.log(name)
//         if ('length' !== name && 'name' !== name && 'prototype' !== name) {
//             return name;
//         }
//     });
//
//     // check if the action method exists in the static class
//     if (methods.find(x => x === method)) {
//         // clone the state
//         const new_state = cloneObject(state);
//
//         // return the static method
//         return reducerClass[method](new_state, action);
//     } else {
//         // there's no valid action, so just return the state
//         return state;
//     }
// }
//
//
// /**
//  * Clone an object
//  *
//  * @param object
//  */
// function cloneObject(object) {
//     return JSON.parse(JSON.stringify(object));
// }
import { combineReducers } from 'redux';


export default combineReducers({
    menu
});