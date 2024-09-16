import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  List, 
  ListItem, 
  ListItemText, 
  TextField, 
  IconButton,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function MobileAutocomplete({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleOptionClick = (option) => {
    onChange(option);
    handleClose();
  };

  return (
    <>
      <TextField
        fullWidth
        value={value ? value.name : ''}
        onClick={handleOpen}
        placeholder={placeholder}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            marginTop: 'auto',
            height: 'auto',
            maxHeight: '80%',
          },
        }}
      >
        <DialogTitle>
          <TextField
            autoFocus
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            placeholder="搜索..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogTitle>
        <List>
          {filteredOptions.map((option) => (
            <ListItem button key={option.id} onClick={() => handleOptionClick(option)}>
              <ListItemText primary={option.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}

export default MobileAutocomplete;