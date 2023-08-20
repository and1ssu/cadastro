import styled, { css } from 'styled-components';
import { TextField as MUITextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

export const TypografyLabel = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #8b8b8b;
  height: 12px;
`;

export const TypografyLink = styled.a`
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

type MessageLabelProps = {
  error?: boolean;
};

export const MessageLabel = styled.div<MessageLabelProps>`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #8b8b8b;
  margin-top: 8px;
  margin-left: 24px;
  height: 12px;

  ${({ error }) =>
    error &&
    css`
      color: #d32f2f;
    `}
`;

export const TextField = styled(MUITextField)<MuiTextFieldProps>`
  .clear-button {
    display: none;
  }

  &:hover {
    .clear-button {
      display: flex;
    }
  }

  ${({ error }) =>
    error &&
    css`
      input::placeholder {
        color: #d32f2f;
        opacity: 0.7;
      }
    `}
`;
