import styled from 'styled-components';
import { focusColor, hoverColor } from './constants';
export default styled.div`
    // height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 77px;
    //flex-basis: 11.11%;
    position: relative;
    border-color: rgba(37, 38, 39, 0.1);
    border-style: solid;
    border-width: 1px;

    font-size: 0.75rem;

    & > img {
        //position: absolute;
        height: 90%;
        width: 90%;
    }

    &:hover {
        background-color: ${hoverColor};
    }
    &:focus {
        background-color: ${focusColor};
    }
`;
