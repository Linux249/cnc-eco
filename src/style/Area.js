import styled from 'styled-components'
import { shadow, backgroundColor, border } from './constants'

export default styled.div`
    display: flex;
    flex-flow: column;
    //flex-wrap: wrap;
    
    ${ shadow + border + backgroundColor }

    height: 100%;
    
    padding: 10px;
    margin-right: 10px;
   

`
