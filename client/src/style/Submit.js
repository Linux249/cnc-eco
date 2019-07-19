import styled from 'styled-components';
import Input from './Input';

const Submit = styled(Input)`
    width: 100%;
    background: #4a90e2;
    padding: 16px 35px;
    color: #fff;
    font-weight: 700;
    font-size: 0.8rem;

    &:hover {
        background: #1d74e2;
        box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
    }

    transition: background 0.1s linear;
`;

export default Submit;
