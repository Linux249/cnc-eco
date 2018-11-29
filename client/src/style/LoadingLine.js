import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

const LoadingBar = styled.div`
    position: relative;
    margin-bottom: 5px;
    width: 100%;
    height: 0.3rem;
    background-color: #ffffff;
`;

const loading = keyframes`
    from {left: 50%; width: 0;z-index:100;}
    33.3333% {left: 0; width: 100%;z-index: 10;}
    to {left: 0; width: 100%;}

`;

const Bar = styled.div`
    content: '';
    display: inline;
    position: absolute;
    width: 0;
    height: 100%;
    left: 50%;
    text-align: center;

    &:nth-child(1) {
        background-color: rgba(59, 120, 231, 0.34);
        animation: ${loading} 6s linear infinite;
    }

    &:nth-child(2) {
        background-color: rgba(59, 120, 231, 0.66);
        animation: ${loading} 6s linear 2s infinite;
    }

    &:nth-child(3) {
        background-color: #ffffff;
        animation: ${loading} 6s linear 4s infinite;
    }
`;

export const LoadingLine = ({ loading }) => (
    <LoadingBar>
        {loading && (
            <>
                <Bar/>
                <Bar/>
                <Bar/>
            </>
        )}
    </LoadingBar>
);

const mapStateToProps = state => {
    const loading = state.auth.isFetching || state.player.loading;
    return { loading };
};

export default connect(mapStateToProps)(LoadingLine);
