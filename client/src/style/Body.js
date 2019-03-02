import styled from 'styled-components';

export default styled.div`
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-template-columns: 1fr auto 1fr;

    > :nth-child(2) {
        max-width: 728px;
    }
`;
