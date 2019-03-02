import styled from 'styled-components';

export default styled.div`
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-template-columns: 1fr minmax(100px, 728px) 1fr;
`;
