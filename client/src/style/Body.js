import styled from 'styled-components';
import { sizes } from './constants';

export default styled.div`
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-template-columns: 1fr minmax(626px, 728px) 1fr;

    @media ${(props) => props.large ? sizes.tablet : sizes.mobile} {
        display: flex;
        flex-direction: column;
    }
`;
