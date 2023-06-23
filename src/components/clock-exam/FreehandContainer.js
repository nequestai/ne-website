import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ClockDraw from './ClockDraw';
import SpiralDraw from './SpiralDraw';

const getInstructions = (variant) => {
  const clockInstructions = (
    <Typography variant="subtitle1" style={{ margin: 'auto', maxWidth: '280px' }}>
      <ul>
        <li>Draw a clock using your finger</li>
        <li>Set the time to half past 2</li>
      </ul>
    </Typography>
  );

  const spiralInstructions = <Typography variant="subtitle1">Trace the below spiral with your finger</Typography>;

  switch (variant) {
    case 'clock':
      return clockInstructions;
    case 'spiral':
      return spiralInstructions;
    default:
      return <></>;
  }
};

const getFreehandScreen = (variant, personalDetails, formState, setFormState, fetchState, fetcher, silenceAlert) => {
  switch (variant) {
    case 'clock':
      return (
        <ClockDraw
          personalDetails={personalDetails}
          formState={formState}
          setFormState={setFormState}
          fetchState={fetchState}
          fetcher={fetcher}
          silenceAlert={silenceAlert}
        />
      );
    case 'spiral':
      return (
        <SpiralDraw
          personalDetails={personalDetails}
          formState={formState}
          setFormState={setFormState}
          fetchState={fetchState}
          fetcher={fetcher}
          silenceAlert={silenceAlert}
        />
      );
    default:
      return <></>;
  }
};

export default function FreehandContainer({
  variant,
  personalDetails,
  formState,
  setFormState,
  fetchState,
  fetcher,
  silenceAlert,
}) {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          {getInstructions(variant)}
        </Grid>
        <Grid item xs={12}>
          {getFreehandScreen(variant, personalDetails, formState, setFormState, fetchState, fetcher, silenceAlert)}
        </Grid>
      </Grid>
    </>
  );
}
