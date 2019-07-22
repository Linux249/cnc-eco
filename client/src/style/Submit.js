import styled from 'styled-components';
import Input from './Input';
import { backgroundColorButtonHeader, backgroundColorHeader } from './constants';

const Submit = styled(Input)`
    width: 100%;
    background: ${backgroundColorButtonHeader};
    padding: 16px 35px;
    color: #fff;
    font-weight: 700;
    font-size: 0.8rem;

    &:hover {
        background: ${backgroundColorHeader};
        box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
    }

    transition: background 0.1s linear;
`;

export default Submit;
