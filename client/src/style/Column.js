import styled from 'styled-components';

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${p => (p.center ? 'center' : 'flex-start')};
`;

export default Column
