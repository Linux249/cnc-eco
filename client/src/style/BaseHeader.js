import styled from 'styled-components';
import { backgroundColorHeader, border } from './constants';

export default styled.div`
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: ${backgroundColorHeader};

    padding: 0 20px;
    margin-bottom: 5px;

    border-bottom: ${border};
`;
