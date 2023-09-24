import styled from 'styled-components';

export const Column = styled.div<{ center: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${(p) => (p.center ? 'center' : 'initial')};
`;

export default Column;
