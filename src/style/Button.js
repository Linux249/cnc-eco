import styled from 'styled-components'
import { shadow, backgroundColor, border } from './constants'

export default styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ${ shadow + border + backgroundColor }
    
    ${({active}) => active? "border-color: red;":""}
    //margin: 2px;
    padding: 5px 12px;
    margin: 1px 2px;
    
    &:hover {
    box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
}

`
