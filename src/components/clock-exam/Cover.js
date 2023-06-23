import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';

// import { makeStyles } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// const useStyles = makeStyles((theme) => ({
//   cardRoot: {
//     margin: '20px 20px 20px -10px',
//     border: '1px solid grey',
//   },
//   root: {
//     fontFamily: 'Nunito !important',
//     paddingLeft: '30px',
//     minHeight: '50vh',
//     [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
//       minHeight: '96vh',
//     },
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// }));

const prefix = `CoverComponent`;
const classes = {
  root: `${prefix}-root`,
  cardRoot: `${prefix}-cardRoot`,
  bullet: `${prefix}-bullet`,
  title: `${prefix}-title`,
  pos: `${prefix}-pos`,
};

const StyledDiv = styled(Box)(({ theme }) => ({
  [`& .${classes.root}`]: {
    fontFamily: 'Nunito !important',
    paddingLeft: '30px',
    minHeight: '50vh',
    [theme.breakpoints.down(600 + theme.spacing(2) * 2)]: {
      minHeight: '96vh',
    },
  },
  [`& .${classes.bullet}`]: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  [`& .${classes.title}`]: {
    fontSize: 14,
  },
  [`& .${classes.pos}`]: {
    marginBottom: 12,
  },
}));

const Cover = ({ setConsent }) => (
  // const classes = useStyles();

  <StyledDiv>
    <Grid container className={classes.root}>
      <Grid item>
        <Typography variant="h4" style={{ paddingTop: '30px' }}>
          <b>NE</b>quest
        </Typography>
        <Typography variant="subtitle1" style={{ color: '#3f51b5' }}>
          Clock-Spiral Drawing Research Survey
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" component="p">
          Clock and spiral draw tests give insight into cognitive impairment and tremors.
        </Typography>
        <Typography variant="body2" component="p">
          Got a minute to participate in active research and help unleash the potential of virtual neurological exams?
        </Typography>
        <br />
        <br />
        <Box display="flex" flexDirection="row-reverse" p={1} m={1} bgcolor="background.paper">
          <Button onClick={() => setConsent(true)} style={{ background: 'green', color: 'white', margin: '20px' }}>
            Yes
          </Button>
        </Box>
        <Card elevation={0} className={classes.cardRoot}>
          <CardContent>
            <Typography variant="body2" component="p">
              <InfoIcon style={{ verticalAlign: 'bottom', fontSize: '20px' }} /> The results from this survey should not
              be considered as professional medical advice. They are for research and informational purposes only.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </StyledDiv>
);
export default Cover;
