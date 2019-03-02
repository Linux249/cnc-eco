import styled from 'styled-components';
import { shadow, backgroundColor, border, borderRadius } from './constants';

export default styled.div`
    //display: flex;
    //flex-flow: column;
    //flex-wrap: wrap;
    background-color: ${backgroundColor};
    border: ${border};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};

    //height: 100%;
    width: fit-content;

    padding: ${({small})=> small ? '2px' : '10px'};
    margin: 5px;
`;
