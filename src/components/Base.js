import React, { Component } from 'react';
import BuildingSlot from '../containers/BuildingSlot.js';
import Area from '../style/Area';
import BaseStyle from '../style/Base';
import Row from '../style/Row';
import ProductionInfo from '../containers/ProductionInfo';

class Base extends Component {
    render() {
        const slots = [...Array(8).keys()].map(function(y) {
            return (
                <Row key={y}>
                    {[...Array(9).keys()].map(function(x) {
                        const slot = x + y * 9;
                        return <BuildingSlot key={slot} slot={slot} />;
                    })}
                </Row>
            );
        });

        return (
            <Area>
                <ProductionInfo />
                <BaseStyle>{slots}</BaseStyle>
            </Area>
        );
    }
}

export default Base;
