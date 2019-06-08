import React from 'react';
import { connect } from 'react-redux';
import { changeFraction } from '../store/actions/base';
import { buildingKeys } from '../util/buildings';
import Menu from '../style/BuildingMenu';
import Area from '../style/Area';
import Button from '../style/Button';
import BuildingMenuItem from './BuildingMenuItem';
import styled from 'styled-components';

const Row = styled.div`
    max-width: 250px;
    display: flex;
`;
const Right = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Min = styled.div`
    max-width: 250px;
`;

function DemoBuildingMenu(props) {
    const { changeFraction, faction, lvl } = props;
    const items = buildingKeys.map(type => {
        const building = {
            type,
            lvl: type !== 't' && type !== 'c' ? lvl : undefined,
        };
        return <BuildingMenuItem faction={faction} type={type} building={building} key={type}/>;
    });
    return (
        <Right>
            <Min>
                <Area small>
                    <Row>
                        <Button small onClick={() => changeFraction('N')}>NOD</Button>
                        <Button small onClick={() => changeFraction('G')}>GDI</Button>
                    </Row>
                    <Menu>{items}</Menu>
                </Area>
            </Min>
        </Right>
    );
}

function mapStateToProps(state) {
    return {
        faction: state.base.faction,
        lvl: state.menu.lvl,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changeFraction: fraction => dispatch(changeFraction(fraction)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DemoBuildingMenu);
