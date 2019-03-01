import React from 'react';
import UrlInfo from '../containers/UrlInfo';
import { Share } from '../containers/Share';
import { Row } from '../style/Row';
import Column from '../style/Column';

export default () => {
    return (
        <Column center>
            <UrlInfo />
            <Share/>
        </Column>
    );
};
