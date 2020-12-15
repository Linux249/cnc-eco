import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    flex-wrap: ${p => (p.wrap ? 'wrap' : 'nowrap')};
    justify-content: ${p => (p.center ? 'center' : 'flex-start')};
`;

export default Row;
