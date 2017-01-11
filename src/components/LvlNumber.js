import React from 'react';

const style = {
    font-weight: bold;
}

export const LvlNumber = props => (
    <p style={style}>{props.lvl}</p>
)