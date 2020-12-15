import styled from 'styled-components';
import { baseColorDark, border } from './constants';

export default styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    background-color: ${baseColorDark};

    padding: 3px 20px;

    border-bottom: ${border};
`;
