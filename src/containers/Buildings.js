import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceBuilding } from '../store/actions/base';
import { changeFraction } from '../store/actions/base';
import { buildingKeys } from '../util/buildings';
import Menu from '../style/BuildingMenu';
import Area from '../style/Area';
import Button from '../style/Button';
import BuildingMenuItem from './BuildingMenuItem';
import Row from '../style/Row';

class BuildingMenu extends Component {
    render() {
        const { changeFraction, faction, lvl } = this.props;
        const items = buildingKeys.map(type => {
            const img = require('./../img/buildings/' + faction + '/' + type + '.png');
            const building = {
                type,
                lvl: type !== 't' && type !== 'c' ? lvl : undefined,
            };
            return <BuildingMenuItem img={img} type={type} building={building} key={type} />;
        });
        return (
            <Area>
                <Row>
                    <Button onClick={() => changeFraction('N')}>NOD</Button>
                    <Button onClick={() => changeFraction('G')}>GDI</Button>
                </Row>
                <Menu>{items}</Menu>
            </Area>
        );
    }
}
function mapStateToProps(state) {
    return {
        faction: state.base.faction,
        lvl: state.menu.lvl,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        replaceBuilding: building => dispatch(replaceBuilding(building)),
        changeFraction: fraction => dispatch(changeFraction(fraction)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingMenu);
