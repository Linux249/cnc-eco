import styled from 'styled-components'
import { shadow, backgroundColor, border } from './constants'

export default styled.div`
    display: flex;
    flex-flow: column;
    //flex-wrap: wrap;
    
    ${ shadow + border + backgroundColor }
    padding: 10px;

    max-width: 250px;
    height: 450px;
    
    margin-right: 10px;
   

`
