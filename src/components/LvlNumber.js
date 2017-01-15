import React from 'react';
import './../style/LvLNumber.css'
/*
const style = {
    backgroundColor: '#d6d7da',
    width: .2,
    borderWidth: 5,
    borderColor: '#d6d7da',
    borderRadius: 8,
}*/
/*


const styleP = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: "20",
    fontFamily: "fantasy",
    color: '#ffffff',
    textDecorationLine: 'line-through',
    textShadowColor: '#dc2826',
    textShadowOffset: [2,2],
    textShadowRadius: 2
}
*/

export const LvlNumber = props => (
    <div className="LvLNumber"><p> {props.lvl}</p></div>
)






