/* eslint-disable require-jsdoc */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

export default function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number },
) {
  return (
    <Stack
      direction='row'
      sx={{width: '100%'}}
      spacing={0}
      alignItems='center'>
      <Box sx={{flexGrow: 8}}>
        <LinearProgress color='inherit' variant="determinate" {...props} />
      </Box>
      <Box sx={{flexGrow: 1}}>
        <Typography
          variant="body2"
          color="#002255aa"
          align='center'>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Stack>
  );
}
