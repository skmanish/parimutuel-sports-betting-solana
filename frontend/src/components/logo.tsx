/* eslint-disable require-jsdoc */
import logo from '../images/logo_light_400.png';
import Box from '@mui/material/Box';

export default function Logo() {
  return (
    <Box
      sx={{height: '10vh', p: 2}}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <img
        src={logo}
        alt='swoop_logo'
        style={{width: 'auto', height: '65px'}} />
    </Box>
  );
}
