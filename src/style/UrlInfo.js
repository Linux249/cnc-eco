import styled from 'styled-components';

export default styled.div`
    display: flex;
    width: 600px;
    height: 25px;

    & > input {
        flex-grow: 1;
    }

    //justify-content: space-around;
    //align-items: center;

    //background-color: #EEE;
    //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    //border: 1px solid #CCC;
    //border-radius: 3px;
    //
    //width: 880px;
    //height: 50px;
    //margin-bottom: 10px;
`;
/*

.UrlInfo input {
    flex-basis: 70%;
    width: 550px;
    /!*margin-right: 20px;*!/
    /!*margin-left: 20px;*!/
}

.UrlInfo div {
    display: flex;
    justify-content: space-around;
    align-items: center;

    background-color: #EEE;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid #CCC;
    border-radius: 3px;
    width: 10%;
    height: 50%;
}*/
