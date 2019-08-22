import styled from 'styled-components';
import Alert from './Alert';
import { keyframes } from 'styled-components';

export const keyFrameHeight = keyframes`
    0% {
        //line-height: 0;
        //height: 0;
        //padding: 0;
        //border: none;     
        transform: scale(0);
    }

    100% {
    //padding: 8px;
        transform: scale(1);
    }
`;

export default styled(Alert)`
    width: unset;
    margin: 4px;
    background-color: #8dbbd6;
    animation: ${keyFrameHeight} 0.2s cubic-bezier(0, 0, 0, 1);
`;
