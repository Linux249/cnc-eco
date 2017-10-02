import styled from 'styled-components'
import { focusColor, hoverColor } from './constants'
export default styled.div`
    height: 80px;
    display: flex;
    flex-basis: 11.11%;
    position: relative;
    border-color: rgba(37, 38, 39, 0.25);
    border-style: solid;
    border-width: 1px;

    & > img {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    
    &:hover {
      background-color: ${hoverColor};
    }
    &:focus {
      background-color: ${focusColor};
    }
`