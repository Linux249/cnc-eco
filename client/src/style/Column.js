import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${p => (p.center ? 'center' : 'flex-start')};
`;
