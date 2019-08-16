import styled from 'styled-components';
import { backgroundColor, border, borderRadius, baseColorWhite, baseColorDark } from './constants';

export const Button = styled.div`
    cursor: pointer;
    // position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ active }) => (active ? backgroundColor : 'inherit')};
    border: ${border};
    border-radius: ${borderRadius};
    background-color: ${({ active }) => (active ? backgroundColor : 'inherit')};

    box-shadow: ${({ active }) => (active ? `3px 3px ${baseColorDark};` : '')}; //margin: 2px;
    padding: ${({ small }) => (small ? '0.2rem' : '0.4rem')} 0.75rem;
    margin: ${({ small }) => (small ? '2px  ' : '0.25rem')};

    font-size: 0.8rem;
    font-weight: 600;
    color: #4d3e13;

    &:first-child {
        ${p => (p.first ? ' margin-left: 0;' : '')}
    }

    &:hover {
        //height: 2rem;
        background-color: ${baseColorWhite};
        transition: background 0.1s linear;
        //box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
    }
    transition: hover 0.1s;
`;
export default Button;
