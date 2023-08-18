import styled from "styled-components";
import logo from '../../assets/logo.png';

export const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    position: absolute;
    z-index: 1;

`;


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    position: fixed;

`;

export const BoxLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 512px;
    padding: 120px;
    margin-right: 120px;
`;

export const BoxRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px;
`;
