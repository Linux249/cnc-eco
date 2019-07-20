import styled from 'styled-components';
import Area from './Area';
import { sizes } from './constants';

const Container = styled(Area)`
    display: block;
    width: 332px;

    @media ${sizes.mobile} {
        width: 100%;
    }
`;

export default Container;
