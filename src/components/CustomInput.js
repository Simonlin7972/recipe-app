import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

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
  return (
    <Autocomplete
      fullWidth
      options={options}
      getOptionLabel={(option) => option.name}
      groupBy={(option) => option.type}
      renderInput={(params) => (
        <TextField
          {...params}
          label="輸入菜色名稱、食材或調味料"
          variant="outlined"
          onKeyPress={onKeyPress}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          {option.type === 'dish' ? '菜名：' : option.type === 'ingredient' ? '食材：' : '調味料：'}
          {option.name}
          {option.type !== 'dish' && ` (在 ${option.dish} 中)`}
        </li>
      )}
      value={value}
      inputValue={inputValue}
      onChange={onChange}
      onInputChange={onInputChange}
      filterOptions={filterOptions}
      freeSolo
      loading={loading}
      disabled={disabled}
    />
  );
};

export default CustomInput;