/**
 * Created by Bombassd on 03.01.2017.
 */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { shortenNumber } from '../util/service';
import { calcBaseCosts, calcProduction } from '../util/production';
import icon_tib from '../img/icon/icon_tiberium.png';
import icon_cris from '../img/icon/icon_crystal.png';
import icon_power from '../img/icon/icon_power.png';
import icon_credits from '../img/icon/icon_credits.png';
import styled, { keyframes } from 'styled-components';
import Area from '../style/Area';
import Button from '../style/Button';

const Grid = styled.div`
    display: grid;

    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: min-content repeat(5, 1fr);

    padding-right: 1rem;
`;

const rotate = keyframes`
    from {top: -10px; left: 0; visibility: visible;}
    to {top: 30px; left: 0; visibility: hidden;}
    //0% {top: -10px; left: 0;}
    //100% {top: 30px; left: 0;}
`;

const Diff = styled.div`
    display: flex;
    justify-content: flex-end;
    animation: ${rotate} 2s ease-in-out;
    font-size: 0.7rem;
    flex: 1;
    color: ${p => (p.positiv ? 'green' : '#e06161')};
`;

const Prod = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
`;

const Img = styled.img`
    height: 20px;
`;

const MiniIcon = styled.img`
    height: 14px;
`;

const Icon = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 80%;
    padding-bottom: 0.2rem;
`;

const HeaderElement = styled.div`
    display: flex;
    justify-content: center;
`;

function ProductionInfo({ buildings }) {
    const firstRender = useRef(true);
    const [production, setProduction] = useState({ tib: 0, kris: 0, power: 0, credits: 0 });
    const [diffProd, setDiffProd] = useState({ tib: 0, kris: 0, power: 0, credits: 0 });
    const [costs, setCosts] = useState({ tib: 0, power: 0 });
    const [diffCosts, setDiffCosts] = useState({ tib: 0, power: 0 });

    useEffect(() => {
        if (!firstRender.current)
            window.requestIdleCallback(() => {
                console.error('CALC NEW PRODUCTION');
                const newProduction = calcProduction(buildings);
                const newCosts = calcBaseCosts(buildings);
                setProduction(newProduction);
                setCosts(newCosts);
                console.warn(diffCosts.tib + (newCosts.tib - costs.tib));
                setDiffProd({
                    tib: diffProd.tib + (newProduction.tib - production.tib),
                    kris: diffProd.kris + (newProduction.kris - production.kris),
                    power: diffProd.power + (newProduction.power - production.power),
                    credits: diffProd.credits + (newProduction.credits - production.credits),
                });
                setDiffCosts({
                    tib: diffCosts.tib + (newCosts.tib - costs.tib),
                    power: diffCosts.power + (newCosts.power - costs.power),
                });
            });
        else {
            firstRender.current = false;
            setProduction(calcProduction(buildings));
            setCosts(calcBaseCosts(buildings));
        }
    }, [buildings]);

    function reset() {
        setDiffProd({ tib: 0, kris: 0, power: 0, credits: 0 });
        setDiffCosts({ tib: 0, kris: 0, power: 0, credits: 0 });
    }

    const { tib, kris, power, credits } = production;

    return (
        <Area>
            <Grid>
                <div />
                <Icon>
                    <Img src={icon_tib} alt={icon_tib} />
                </Icon>
                <Icon>
                    <Img src={icon_cris} alt={icon_tib} />
                </Icon>
                <Icon>
                    <Img src={icon_power} alt={icon_tib} />
                </Icon>
                <Icon>
                    <Img src={icon_credits} alt={icon_tib} />
                </Icon>

                {/*production*/}
                <HeaderElement>total</HeaderElement>
                <Prod>{shortenNumber(tib, 2)}</Prod>
                <Prod>{shortenNumber(kris, 2)}</Prod>
                <Prod>{shortenNumber(power, 2)}</Prod>
                <Prod>{shortenNumber(credits, 2)}</Prod>

                {/*changes in production*/}
                <HeaderElement>/h</HeaderElement>
                <Diff positiv={diffProd.tib >= 0}>{shortenNumber(diffProd.tib)}</Diff>
                <Diff positiv={diffProd.kris >= 0}>{shortenNumber(diffProd.kris)}</Diff>
                <Diff positiv={diffProd.power >= 0}>{shortenNumber(diffProd.power)}</Diff>
                <Diff positiv={diffProd.credits >= 0}>{shortenNumber(diffProd.credits)}</Diff>

                {/*changes in base costs*/}
                <HeaderElement>costs</HeaderElement>
                <Diff positiv={diffCosts.tib === 0}>{shortenNumber(diffCosts.tib)}</Diff>
                <Diff />
                <Diff positiv>
                    {diffProd.power &&
                        diffCosts.tib &&
                        shortenNumber(Math.round(diffCosts.tib / diffProd.power))}
                </Diff>
                <Diff />

                {/*tib costs changes / production changes */}
                <HeaderElement>
                    eff <MiniIcon src={icon_tib} alt={icon_tib} />
                </HeaderElement>
                <Diff positiv>
                    {diffProd.tib &&
                        diffCosts.tib &&
                        shortenNumber(Math.round(diffCosts.tib / diffProd.tib))}
                </Diff>
                <Diff positiv>
                    {diffProd.kris &&
                        diffCosts.tib &&
                        shortenNumber(Math.round(diffCosts.tib / diffProd.kris))}
                </Diff>
                <Diff positiv>
                    {diffProd.power &&
                        diffCosts.tib &&
                        shortenNumber(Math.round(diffCosts.tib / diffProd.power))}
                </Diff>
                <Diff positiv>
                    {diffProd.credits &&
                        diffCosts.tib &&
                        shortenNumber(Math.round(diffCosts.tib / diffProd.credits))}
                </Diff>

                <HeaderElement>
                    eff <MiniIcon src={icon_power} alt={icon_tib} />
                </HeaderElement>
                <Diff positiv>
                    {diffProd.tib &&
                        diffCosts.power &&
                        shortenNumber(Math.round(diffCosts.power / diffProd.tib))}
                </Diff>
                <Diff positiv>
                    {diffProd.kris &&
                        diffCosts.power &&
                        shortenNumber(Math.round(diffCosts.power / diffProd.kris))}
                </Diff>
                <Diff positiv>
                    {diffProd.power &&
                        diffCosts.power &&
                        shortenNumber(Math.round(diffCosts.power / diffProd.power))}
                </Diff>
                <Diff positiv>
                    {diffProd.credits &&
                        diffCosts.power &&
                        shortenNumber(Math.round(diffCosts.power / diffProd.credits))}
                </Diff>
            </Grid>
            <Button onClick={reset}>reset</Button>
        </Area>
    );
}

function mapStateToProps(state) {
    return {
        buildings: state.base.buildings,
    };
}

export default connect(mapStateToProps)(ProductionInfo);
