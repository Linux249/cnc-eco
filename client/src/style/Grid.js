import styled from 'styled-components';
import backgrounds from '../img/background';
import { border, borderRadius, shadow } from './constants';

export default styled('div')`
    display: grid;
    grid-template-rows: repeat(${p => p.rows}, 1fr);
    grid-template-columns: repeat(9, 1fr);

    position: relative;

    // border: ${border};
    // border-radius: ${borderRadius};
    // box-shadow: ${shadow};

    //padding: 10px;

    ::after {
        content: '';
        background-image: url(${backgrounds.N});
        background-size: 125%;
        background-position-x: -80px;
        background-position-y: -5px;
        opacity: 0.9;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }

    // equal squares from https://medium.com/cloudaper/how-to-create-a-flexible-square-grid-with-css-grid-layout-ea48baf038f3
    &:before {
        content: '';
        width: 0;
        padding-bottom: 82%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    & > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
`;
