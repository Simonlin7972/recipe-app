import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const CustomInput = ({ 
  options, 
  value, 
  inputValue,
  onChange, 
  onInputChange, 
  filterOptions, 
  onKeyPress,
  loading,
  disabled
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const displayOptions = inputValue
    ? options
    : options.filter(option => option.type === 'dish');

  return (
    <Autocomplete
      fullWidth
      options={displayOptions}
      getOptionLabel={(option) => option?.name || ''}
      groupBy={(option) => {
        if (!inputValue) return '';
        switch (option.type) {
          case 'dish':
            return '菜色';
          case 'ingredient':
            return '食材';
          case 'seasoning':
            return '調味料';
          default:
            return '';
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="輸入菜色名稱、食材或調味料"
          variant="outlined"
          onKeyPress={onKeyPress}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} style={{ borderRadius: 0 }}>
          {option.name}
          {inputValue && option.type !== 'dish' && ` (${option.dish})`}
        </li>
      )}
      value={value || null}
      inputValue={inputValue || ''}
      onChange={onChange}
      onInputChange={onInputChange}
      filterOptions={filterOptions}
      freeSolo
      loading={loading}
      disabled={disabled}
      slotProps={{
        paper: {
          sx: {
            '& .MuiAutocomplete-listbox': {
              padding: 0,
              boxShadow: 'none',
            },
            '& .MuiAutocomplete-option': {
              // 這裡調整 listbox item 的樣式
              padding: '8px 16px',
              borderRadius: 2, // 使用主題的 borderRadius 值，通常對應 8px
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              '&[aria-selected="true"]': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            },
          },
        },
        popper: {
          sx: {
            // 這裡可以調整 popper 的樣式
            padding: 0,
          },
        },
      }}
    />
  );
};

export default CustomInput;