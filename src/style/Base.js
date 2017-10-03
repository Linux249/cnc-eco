import styled from 'styled-components'
import { shadow, backgroundColor, border } from './constants'

export default styled.div`

    ${ shadow + border + backgroundColor }


    max-width: 820px;

    display: flex;
    flex-flow: wrap;
    /*max-height: 800px;*/
    /*margin: -20px;*/

    padding: 10px;
    /*padding-right: 30px;*/
    /*margin: -30px;*/
    /*margin-right: -30px;*/
`