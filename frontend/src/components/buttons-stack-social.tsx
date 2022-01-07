import React from 'react';
// import {Link} from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TwitterIcon from '@mui/icons-material/Twitter';
import Stack from '@mui/material/Stack';

const ButtonStackSocial = () => {
  return (
    <Stack direction='row' m='auto' sx={{mb: 1}}>
      <Tooltip title="Contact Us">
        <IconButton
          color='primary'
          onClick={(_e)=>window.open('mailto:admin@swager.it')}>
          <EmailIcon />
        </IconButton>
      </Tooltip>
      <IconButton color='primary'>
        <TwitterIcon/>
      </IconButton>
    </Stack>
  );
};

export default ButtonStackSocial;
