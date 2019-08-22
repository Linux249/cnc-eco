import styled from 'styled-components';
import backgrounds from '../img/background';
import { border, borderRadius, shadow } from './constants';

export default styled('div')`
    display: grid;
    grid-template-rows: repeat(${p => p.rows}, 1fr);
    grid-template-columns: repeat(9, 1fr);

    background-image: url(${backgrounds.N});
    background-size: 125%;
    background-position-x: -80px;
    background-position-y: -5px;
    
    border: ${border};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};
    
    margin: 5px;

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
