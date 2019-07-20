import React from 'react';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
    0% {left: 0%;}
  75% {left:100%;}
  100% {left:100%;}

`;

const Spinner = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    top: -5px;
    background-color: rgba(51, 51, 51, 0.7);
    border-radius: 100%;
    animation: ${move} 4s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);

    &:nth-child(2) {
        animation-delay: 150ms;
    }

    &:nth-child(3) {
        animation-delay: 300ms;
    }

    &:nth-child(4) {
        animation-delay: 450ms;
    }
`;

const SpinnerBar = styled.div`
    position: relative;

    height: 0.3rem;
    width: 100%;
`;

export const LoadingPoints = ({ loading }) => (
    <SpinnerBar>
        {loading !== 0 && (
            <>
                <Spinner />
                <Spinner />
                <Spinner />
                <Spinner />
            </>
        )}
    </SpinnerBar>
);

export default LoadingPoints;
