import styled from "styled-components";

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 41px;
    overflow: auto;
    max-height: 450px;
    white-space: nowrap;


    border-radius: 5px;
    //box-shadow: 0px 0px 3px 0px #416ab6;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;


`;
