import React from 'react';
// import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { useLazyQuery, gql } from '@apollo/client';
import confetti from 'canvas-confetti';

import { getClockScore, getSpiralScore, percentile } from '../../utils';

let suffix = '';

if (process.env.NODE_ENV === 'development') {
  suffix = 'Dev';
}

const GET_RESULTS = gql`
  query getResults${suffix} {
    experiment1${suffix} {
      scoreClock
      scoreSpiral
    }
  }
`;

// const useStyles = makeStyles((theme) => ({
//   listItem: {
//     padding: `${theme.spacing(1) / 2}px ${theme.spacing(1)}px`,
//   },
//   total: {
//     fontWeight: 700,
//   },
//   title: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function Review({ fetchState }) {
  // const classes = useStyles();
  const { T_clock, T_spiral } = fetchState || {};
  const [getResults, results] = useLazyQuery(GET_RESULTS);

  const clockScore = getClockScore(fetchState || {});
  const spiralScore = getSpiralScore(fetchState || {});

  const resultsArray = (results.called && results.data && results.data[`experiment1${suffix}`]) || [];

  const clockPercentile = percentile(
    resultsArray.map((res) => res.scoreClock),
    clockScore,
  );

  const spiralPercentile = percentile(
    resultsArray.map((res) => res.scoreSpiral),
    spiralScore,
  );

  const cMetrics = [
    {
      name: 'Total time',
      desc: 'Time to draw the clock',
      value: T_clock ? `${Math.round(T_clock)}s` : 'N/A',
    },
  ];

  if (clockPercentile) {
    cMetrics.push({
      name: 'Clock Rank',
      desc: 'Your percentile score',
      value: `${Math.round(clockPercentile)}th`,
    });
  }

  const sMetrics = [
    {
      name: 'Total time',
      desc: 'Time to draw the spiral',
      value: T_spiral ? `${Math.round(T_spiral)}s` : 'N/A',
    },
  ];

  if (spiralPercentile) {
    sMetrics.push({
      name: 'Spiral Rank',
      desc: 'Your percentile score',
      value: `${Math.round(spiralPercentile)}th`,
    });
  }

  React.useEffect(() => {
    getResults();
  }, []);

  React.useEffect(() => {
    if (clockPercentile && spiralPercentile) {
      setTimeout(
        () =>
          confetti({
            gravity: 0.5,
            spread: 90,
          }),
        300,
      );
    }
  }, [clockPercentile, spiralPercentile]);

  return (
    <Grid container style={{ padding: '30px' }} spacing={2}>
      <Grid item xs={12}>
        {clockPercentile && spiralPercentile ? (
          <>
            <Typography variant="h6" gutterBottom>
              Clock
            </Typography>
            <List disablePadding>
              {cMetrics.map((product) => (
                <ListItem key={product.name}>
                  <ListItemText primary={product.name} secondary={product.desc} />
                  <Typography variant="body2">{product.value}</Typography>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" gutterBottom>
              Spiral
            </Typography>
            <List disablePadding>
              {sMetrics.map((product) => (
                <ListItem key={product.name}>
                  <ListItemText primary={product.name} secondary={product.desc} />
                  <Typography variant="body2">{product.value}</Typography>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <CircularProgress style={{ display: 'block', margin: '50px auto' }} />
        )}
      </Grid>
    </Grid>
  );
}
