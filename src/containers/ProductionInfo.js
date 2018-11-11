/**
 * Created by Bombassd on 03.01.2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../style/Button';
import Info from '../style/ProductionInfo';
import { shortenNumber } from '../services/menu';
import { calcProduction } from '../util/production';
import icon_tib from '../img/icon/icon_tiberium.png';
import icon_cris from '../img/icon/icon_crystal.png';
import icon_power from '../img/icon/icon_power.png';
import icon_credits from '../img/icon/icon_credits.png';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
 from {top: -10px; left: 0; visibility: visible;}
to {top: 30px; left: 0; visibility: hidden;}
/*0% {top: -10px; left: 0;}

  100% {top: 30px; left: 0;}*/
`;

const Diff = styled.div`
    //position: absolute;
    display: inline-block;
    animation: ${rotate} 2s ease-in-out;
    padding: 0 1rem;
    font-size: 0.8rem;

    color: ${p => (p.positiv ? 'green' : '#e06161')};
`;

class ProductionInfo extends Component {
    state = {
        diff: { tib: '', kris: '', power: '', credits: '' },
        production: calcProduction(this.props.buildings),
    };

    componentDidUpdate(prevProps) {
        if (prevProps.buildings !== this.props.buildings)
            window.requestIdleCallback(() =>
                this.setState(({ production }) => {
                    const newProduction = calcProduction(this.props.buildings);
                    const diff = {
                        tib: shortenNumber(newProduction.tib - production.tib, 2),
                        kris: shortenNumber(newProduction.kris - production.kris, 2),
                        power: shortenNumber(newProduction.power - production.power, 2),
                        credits: shortenNumber(newProduction.credits - production.credits, 2),
                    };
                    return {
                        diff,
                        production: newProduction,
                    };
                })
            );
    }

    render() {
        //return null;

        const { diff } = this.state;
        const { tib, kris, power, credits } = this.state.production;

        return (
            <Info>
                <Button>
                    <img src={icon_tib} alt={icon_tib} />
                    {shortenNumber(tib, 2)}
                    <Diff positiv={diff.tib.charAt(0) !== '-'}>{diff.tib}</Diff>
                </Button>
                <Button>
                    <img src={icon_cris} alt={icon_tib} />
                    {shortenNumber(kris, 2)}
                    <Diff positiv={diff.kris.charAt(0) !== '-'}>{diff.kris}</Diff>
                </Button>
                <Button>
                    <img src={icon_power} alt={icon_tib} />
                    {shortenNumber(power, 2)}
                    <Diff positiv={diff.power.charAt(0) !== '-'}>{diff.power}</Diff>
                </Button>
                <Button>
                    <img src={icon_credits} alt={icon_tib} />
                    {shortenNumber(credits, 2)}
                    <Diff positiv={diff.credits.charAt(0) !== '-'}>{diff.credits}</Diff>
                </Button>
            </Info>
        );
    }
}
function mapStateToProps(state) {
    return {
        buildings: state.base.buildings,
    };
}

export default connect(mapStateToProps)(ProductionInfo);
