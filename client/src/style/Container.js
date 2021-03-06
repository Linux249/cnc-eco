import styled from 'styled-components';
import Area from './Area';
import { sizes } from './constants';

const Container = styled(Area)`
    display: block;
    width: 338px;

    @media ${sizes.mobile} {
        width: unset;
    }
`;

export default Container;
