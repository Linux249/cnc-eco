import styled from 'styled-components';
import { backgroundColorHeader, border } from './constants';

export default styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: ${backgroundColorHeader};

    padding: 3px 20px;

    border-bottom: ${border};
`;
