import styled from 'styled-components'
import { focusColor, hoverColor } from './constants'
export default styled.div`

    display: flex;
    /*justify-content: flex-end;*/
    /*text-align: center;*/
    /*top: 30px;*/
    /*left: 2px;*/
    z-index: 10;
    width: 100%;

    & > div {
    letter-spacing: 0;
    max-height: 30%;
    /*width: 30%;*/
    /*display: flex;*/
    /*justify-content: flex-end;*/
    /*font-size: 18px;*/

    /*color: #000000;*/
    text-shadow: 0.5px -0.5px 2px grey;
    /*background-color: #ffffff;*/
    border-radius: 20px;
    /*padding: 0px;*/
    /*padding-top: 3px;*/
    padding-left: 3px;
    padding-right: 4px;
    /*padding-bottom: -1px;*/
    background: rgba(255, 255, 255, 0.15);
`