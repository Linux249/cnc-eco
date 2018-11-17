import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-wrap: ${p => (p.wrap ? 'wrap' : 'nowrap')};
`;
