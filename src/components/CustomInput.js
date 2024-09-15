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
  // 新增一個函數來去重複選項
  const deduplicateOptions = (opts) => {
    const uniqueOptions = [];
    const seenNames = new Set();

    opts.forEach(option => {
      if (!seenNames.has(option.name)) {
        seenNames.add(option.name);
        uniqueOptions.push(option);
      }
    });

    return uniqueOptions;
  };

  // 使用去重複後的選項
  const uniqueOptions = deduplicateOptions(options);

  return (
    <Autocomplete
      fullWidth
      options={uniqueOptions}
      getOptionLabel={(option) => option?.name || ''}
      groupBy={(option) => {
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
        <li {...props}>
          {option.name}
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
    />
  );
};

export default CustomInput;