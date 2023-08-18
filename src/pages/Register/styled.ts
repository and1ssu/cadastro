import styled from 'styled-components';
import { Paper as MuiPaper, PaperProps as MuiPaperProps } from '@mui/material';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background-color: #4f23ed;
    width: 104vw;
    height: 100vh;
    position: fixed;
`;


export const Paper = styled(MuiPaper) <MuiPaperProps>`
    display: flex;
    width: 480px;
    height: 480px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
`;

export const Button = styled(MuiButton) <MuiButtonProps>`
    width: 100%;
    height: 50px;
`;

export const Link  = styled.a`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #8b8b8b;
    height: 12px;
    text-decoration: underline;
    &:hover {
        cursor: pointer;
    }
`;