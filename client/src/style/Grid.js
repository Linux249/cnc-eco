import styled from 'styled-components';

export default styled('div')`
    display: grid;
    grid-template-rows: repeat(${p => p.rows}, 1fr);
    grid-template-columns: repeat(9, 1fr);

    // equal squares from https://medium.com/cloudaper/how-to-create-a-flexible-square-grid-with-css-grid-layout-ea48baf038f3
    &:before {
        content: '';
        width: 0;
        padding-bottom: 95%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    & > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
`;
