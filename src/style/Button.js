import styled from 'styled-components'
import { shadow, backgroundColor, border } from './constants'

export default styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 20%;
    height: 30px;

    ${ shadow + border + backgroundColor }
    
    margin: 2px;
    
    &:hover {
    box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
}

`
