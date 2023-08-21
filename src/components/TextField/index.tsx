import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, IconButton, TextFieldProps as MUITextFieldProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




import * as S from './styled';

export type DSTextFieldProps = {
  disabledIfNoValue?: boolean;
  height?: string;

} & MUITextFieldProps;

export default function TextField({
  disabled,
  disabledIfNoValue,
  label,
  height,
  ...rest
}: DSTextFieldProps) {
  const [value, setValue] = useState(rest.value);

  if (rest.InputProps) {
    rest.InputProps = {
      ...rest.InputProps,
    };
  }

  let disabledValue = false;

  if (!rest.value && disabledIfNoValue) {
    disabledValue = true;
  }

  if (disabled) {
    disabledValue = true;
  }

  useEffect(() => {
    setValue(rest.value);
  }, [rest.value]);



  const handleClearTextField = useCallback(() => {
    setValue('');
  }, []);

  const defaultEndAdornment = useMemo(() => {
    return (
      <Box className="dss-text-field-endAdornment">
        <IconButton
          children={<CloseIcon fontSize="small" />}
          onClick={handleClearTextField}
          className="clear-button"
        />
      </Box>
    )
  }, [handleClearTextField]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height:`${height}` }}>
      <S.TextField
        {...rest}
        error={!disabledValue && rest.error}
        disabled={disabledValue}
        label={label}
        className={`dss-text-field ${disabledValue ? 'dss-text-field-disabled' : ''} ${
          rest.className || ''
        }`}
        value={value || ''}
        InputProps={{
          ...rest.InputProps,
          className: `dss-text-field-input ${disabledValue ? 'dss-text-field-input-disabled' : ''}`,
          endAdornment: rest.InputProps?.endAdornment ?? defaultEndAdornment
        }}
        InputLabelProps={{
          sx: {
            top: -4,
          },
        }}
      />

    </div>
  );
}
