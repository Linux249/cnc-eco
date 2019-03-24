import styled from 'styled-components';
import { shadow, backgroundColor, border, borderRadius, backgroundColorButtonHeader } from './constants';

export const Button = styled.div`
    // position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color:  ${({ active }) => active ? backgroundColor : 'inherit'} ;
    border: ${border};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};

    ${({ active }) => (active ? 'border-color: #551A8B;' : '')} ;//margin: 2px;
    padding: ${({ small }) => (small ? '0.2rem' : '0.4rem')} 0.75rem;
    margin: 0.25rem;
    
    font-size: 0.8rem;
    //line-height: 1;
    
    //height: 1rem;
	//overflow: hidden;



    &:hover {
        //height: 2rem;
        box-shadow: 0 4px 8px 0 rgba(30, 136, 229, 0.2), 0 6px 20px 0 rgba(30, 136, 229, 0.19);
    }
`;
export default Button;
