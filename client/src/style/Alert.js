import styled from 'styled-components';
import { alarm, sizes } from './constants';

export default styled.div`
    width: ${({fix}) => fix ? '338px' : '100%'};
    display: flex;
    justify-content: center;

    padding: 8px;
    margin: 6px;

    box-sizing: border-box;
    background-color: ${alarm};

    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    color: #fff;
    font-weight: 700;
    //font-size: 0.8rem;
    text-transform: uppercase;
    

    @media ${sizes.mobile} {
        width: 100%;
    }
    
    //transition: all 1s;
`;
