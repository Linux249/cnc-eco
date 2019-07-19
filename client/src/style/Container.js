import styled from 'styled-components';
import Area from './Area';

const Container = styled(Area)`
    display: block;
    width: 332px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export default Container;
