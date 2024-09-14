import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const CustomInput = ({ 
  options, 
  value, 
  onChange, 
  onInputChange, 
  filterOptions, 
  onKeyPress,
  loading,
  disabled
}) => {
  return (
    <Autocomplete
      fullWidth
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="輸入菜色名稱"
          variant="outlined"
          onKeyPress={onKeyPress}
        />
      )}
      value={value}
      onChange={onChange}
      onInputChange={onInputChange}
      filterOptions={filterOptions}
      freeSolo
      limitTags={6}
      loading={loading}
      disabled={disabled}
      ListboxProps={{
        style: { maxHeight: 48 * 8 } // 假設每個選項高度為 48px
      }}
      slotProps={{
        popper: {
          sx: {
            backgroundColor: '#fff',
            border: '1px solid #eee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '12px',
            padding: '4px 8px',
            margin: '8px',
          },
        },
      }}
    />
  );
};

export default CustomInput;