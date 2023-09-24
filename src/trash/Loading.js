
import styled from 'styled-components';

const Loading = styled.div`
    font-size: 100px;
`;
const LoadingComponent = ({ isLoading }) => <Loading>{isLoading ? 'Loading' : ''}</Loading>;
export default LoadingComponent;
