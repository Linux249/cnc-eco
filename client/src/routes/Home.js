import React from 'react';
import UrlInfo from '../containers/UrlInfo';
import { Share } from '../containers/Share';
import { Row } from '../style/Row';
import Column from '../style/Column';

// TODO BAse here
// /s/ to shortand
// /s/ to shortand

export default (props) => {
    return (
        <Column center>
            <UrlInfo />
            <Share/>
        </Column>
    );
};
