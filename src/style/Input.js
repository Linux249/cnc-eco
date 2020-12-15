import styled from 'styled-components';
import { baseColorWhite } from './constants';

export default styled.input`
    width: 100%;

    margin: ${p => (p.small ? '0.25rem' : '0')};

    padding: ${p => (p.small ? '4px 6px' : '10px')};

    min-width: 62px;

    box-sizing: border-box;
    color: #55595c;
    background-color: #fff;

    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;

    &:focus {
        background-color: ${baseColorWhite};
        outline: none !important;
    }
`;
