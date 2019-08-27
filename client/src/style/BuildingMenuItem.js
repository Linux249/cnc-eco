import styled from 'styled-components';

export default styled.div`
    cursor: pointer;

    display: inline-block;
    width: 60px;
    height: 15%;
    align-content: center;
    text-align: center;

    padding: 2px;

    & > img {
        /*height: auto;*/
        max-width: 100%;
        max-height: 100%;
    }
`;
