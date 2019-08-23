import styled from 'styled-components';
import { sizes } from './constants';

export default styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    

    font-size: 0.75rem;

    max-width: 338px;
    max-height: 450px;
    
    @media ${sizes.mobile} {
        max-width: 100%;
    }
`;
