import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = ['0.5x', '1.0x', '1.25', '1.5x','2.0x'];

export default function PlayBackButton({wavesurfer}) {

  const [open, setOpen] = React.useState(false);          // To handle the Menu (open or close)
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);   // Keep track of index



  const handleMenuItemClick = (event, index) => {  // Choosing from menu
    let rate = 1
    if(index === 0)      rate = 0;
    else if(index === 2) rate = 1.25;
    else if(index === 3) rate = 1.5;
    else if(index === 4) rate = 2;
    setSelectedIndex(index)
    wavesurfer.current.setPlaybackRate(rate)
    setOpen(false);
  };

  const handleToggle = () => {   // On Arrow click
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => { // If Clicked away from Button then close
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button >{options[selectedIndex]}</Button>
        <Button
          size="small"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      {/* MENU OPTIONS INSIDE BUTTON */}
      <Popper   
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
