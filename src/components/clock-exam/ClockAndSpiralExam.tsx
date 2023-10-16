import React, { useCallback, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { gql, useMutation } from '@apollo/client';

import { styled } from '@mui/material/styles';
import { Grid, Paper, Stepper, Step, StepLabel, Button, Typography, ThemeProvider, Divider } from '@mui/material';

import muiTheme from 'theme/mui';

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

import PersonalDetails from './PersonalDetails';
import FreehandContainer from './FreehandContainer';
import CollectPersonalInfo from './CollectPersonalInfo';
import Review from './Review';
import Cover from './Cover';

let suffix = ``;

if (process.env.NODE_ENV === `development`) {
  suffix = `Dev`;
}

const steps = [`Personal Details`, `Draw a Clock`, `Draw a Spiral`, `Your Results`];

const INSERT_EXPERIMENT = gql`
  mutation insertExperiment1${suffix}($age: Float!, $country: String!, $gender: String!, $conditions: String) {
    insert_experiment1${suffix}(
      age: $age,
      country: $country,
      gender: $gender,
      version: "1.0.1",
      conditions: $conditions
    ) {
      id,
      pk
    }
  }
`;

const UPDATE_EXPERIMENT = gql`
  mutation updateExperiment1${suffix}($id: String, $other: String) {
    update_experiment1${suffix}(
      id: $id,
      other: $other
    ) {
      id
    }
  }
`;

const UPDATE_CLOCK = gql`
  mutation updateExperiment1${suffix}(
    $id: String
    $tClock: Float!
    $doClock: Float!
    $dpClock: Float!
    $haClock: Float!
    $obClock: Float!
    $clockJson: String!
    $userAgent: String!
  ) {
    update_experiment1${suffix}(
      id: $id
      tClock: $tClock
      doClock: $doClock
      dpClock: $dpClock
      haClock: $haClock
      obClock: $obClock
      clockJson: $clockJson
      userAgent: $userAgent
    ) {
      id
    }
  }
`;

const UPDATE_SPIRAL = gql`
  mutation updateExperiment1${suffix}(
    $id: String!
    $tSpiral: Float!
    $lsSpiral: Float!
    $dsSpiral: Float!
    $wSpiral: Float!
    $cSpiral: Float!
    $tdSpiral: Float!
    $spiralJson: String!
    $userAgent: String!
  ) {
    update_experiment1${suffix}(
      id: $id
      tSpiral: $tSpiral
      lsSpiral: $lsSpiral
      dsSpiral: $dsSpiral
      wSpiral: $wSpiral
      cSpiral: $cSpiral
      tdSpiral: $tdSpiral
      spiralJson: $spiralJson
      userAgent: $userAgent
    ) {
      id
    }
  }
`;

const PREFIX = `ClockAndSpiralExam`;
const classes = {
  thankyouContainer: `${PREFIX}-thankyouContainer`,
  layout: `${PREFIX}-layout`,
  paper: `${PREFIX}-paper`,
  stepper: `${PREFIX}-stepper`,
  buttons: `${PREFIX}-buttons`,
  button: `${PREFIX}-button`,
};
const Root = styled(`div`)(({ theme }) => ({
  [`& .${classes.thankyouContainer}`]: {
    textAlign: `center`,
    padding: `50px`,
  },
  [`& .${classes.layout}`]: {
    width: `auto`,
    fontFamily: `Nunito !important`,
    [theme.breakpoints.up(600 + Number(theme.spacing(2)) * 2)]: {
      width: 600,
      marginLeft: `auto`,
      marginRight: `auto`,
    },
  },
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: 15,
    overflow: `hidden`,
    [theme.breakpoints.up(600 + Number(theme.spacing(3)) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  [`& .${classes.stepper}`]: {
    padding: theme.spacing(2),
  },
  [`& .${classes.buttons}`]: {
    display: `flex`,
    justifyContent: `flex-end`,
    padding: theme.spacing(2),
  },
  [`& .${classes.button}`]: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function getStepContent({ step, personalDetails, formState, setFormState, fetchState, fetcher, silenceAlert }: any) {
  switch (step) {
    case 0:
      return <PersonalDetails personalDetails={personalDetails} setFormState={setFormState} />;
    case 1:
      return (
        <FreehandContainer
          variant="clock"
          formState={formState}
          personalDetails={personalDetails}
          setFormState={setFormState}
          fetchState={fetchState}
          fetcher={fetcher}
          silenceAlert={silenceAlert}
        />
      );
    case 2:
      return (
        <FreehandContainer
          variant="spiral"
          formState={formState}
          personalDetails={personalDetails}
          setFormState={setFormState}
          fetchState={fetchState}
          fetcher={fetcher}
          silenceAlert={silenceAlert}
        />
      );
    case 3:
      return <Review fetchState={fetchState} />;
    default:
      throw new Error(`Unknown step`);
  }
}

function getStepButtons({
  activeStep,
  setActiveStep,
  personalDetails,
  setPersonalDetails,
  formState,
  fetchState,
  fetcher,
}: any) {
  const handleNext = () => {
    // on personal details screen
    if (activeStep === 0 && !personalDetails) {
      setPersonalDetails(true);
      // setActiveStep(activeStep + 1);
    }

    // on clock or spiral screens
    if (activeStep === 1 || activeStep === 2) {
      fetcher({
        ...fetchState,
        alert: true,
      });
    } else if (personalDetails && !isEmpty(formState) && !fetchState.alert) {
      setActiveStep(activeStep + 1);
    }
  };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  return activeStep === steps.length - 1 ? (
    <>
      {/* <Button
        variant="contained"
        className={classes.button}
        color="primary"
        onClick={() => setActiveStep(1)}
        className={classes.button}
      >
        Retry
      </Button> */}
      <Button variant="contained" className={classes.button} color="primary" onClick={handleNext}>
        Done
      </Button>
    </>
  ) : (
    <Button variant="contained" color="primary" className={classes.button} onClick={handleNext}>
      Next
    </Button>
  );
}

export default function ClockAndSpiralExam() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [personalDetails, setPersonalDetails] = React.useState(false);
  const [formState, setFormState] = React.useState({
    age: ``,
    country: {
      label: ``,
      value: ``,
    },
    gender: ``,
    conditions: ``,
    other: ``,
  });
  const [fetchState, fetcher] = React.useState({
    alert: false,
    T_clock: null,
    T_spiral: null,
    Do_clock: null,
    Dp_clock: null,
    Ha_clock: null,
    Ob_clock: null,
    Ls_spiral: null,
    Ds_spiral: null,
    W_spiral: null,
    C_spiral: null,
    Td_spiral: null,
    clock_json: null,
    spiral_json: null,
  });
  const [fbUrl, setFbUrl] = useState(``);
  const [insertExperiment1, experiment1] = useMutation(INSERT_EXPERIMENT);
  const [updateExperiment1, experiment1Updated] = useMutation(UPDATE_EXPERIMENT);
  const [updateClock, updatedClock] = useMutation(UPDATE_CLOCK);
  const [updateSpiral, updatedSpiral] = useMutation(UPDATE_SPIRAL);
  const [consent, setConsent] = useState(false);
  const [pk, setPk] = useState(``);
  const [id, setId] = useState(``);

  useEffect(() => {
    setFbUrl(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://nequest.ai/clock-exam`)}`);
  }, []);

  const silenceAlert = useCallback(
    (data) => {
      fetcher({
        ...data,
        alert: false,
      });
      setActiveStep(activeStep + 1);
    },
    [activeStep, setActiveStep, fetcher],
  );

  useEffect(() => {
    // create record
    if (!isEmpty(formState) && formState.age && !experiment1.called) {
      insertExperiment1({
        variables: {
          age: parseFloat(formState.age),
          country: formState.country.label,
          gender: formState.gender,
          conditions: formState.conditions,
        },
      });
    }

    // update record
    if (fetchState && experiment1.called && experiment1.data && (!updatedClock.called || !updatedSpiral.called)) {
      const ie1 = experiment1.data[`insert_experiment1${suffix}`];
      if (ie1 && ie1[0]) {
        const record_id = ie1[0] && ie1[0].id;
        const record_pk = ie1[0] && ie1[0].pk;

        const {
          T_clock,
          T_spiral,
          Do_clock,
          Dp_clock,
          Ha_clock,
          Ob_clock,
          Ls_spiral,
          Ds_spiral,
          W_spiral,
          C_spiral,
          Td_spiral,
          clock_json,
          spiral_json,
        } = fetchState;

        setPk(record_pk);
        setId(record_id);

        if (formState.other && !experiment1Updated.called && personalDetails) {
          updateExperiment1({
            variables: {
              record_id,
              other: formState.other,
            },
          });
        }

        if (!updatedClock.called && typeof fetchState.T_clock === `number`) {
          updateClock({
            variables: {
              id: record_id,
              tClock: T_clock,
              doClock: Do_clock,
              dpClock: Dp_clock,
              haClock: Ha_clock,
              obClock: Ob_clock,
              clockJson: clock_json,
              userAgent: navigator.userAgent,
            },
          });
        } else if (!updatedSpiral.called && typeof fetchState.T_spiral === `number`) {
          updateSpiral({
            variables: {
              id: record_id,
              tSpiral: T_spiral,
              lsSpiral: Ls_spiral,
              dsSpiral: Ds_spiral,
              wSpiral: W_spiral,
              cSpiral: C_spiral,
              tdSpiral: Td_spiral,
              spiralJson: spiral_json,
              userAgent: navigator.userAgent,
            },
          });
        }
      }
    }
  }, [fetchState, formState, experiment1, updatedClock, updatedSpiral, personalDetails]);

  const icons = [
    <EmailShareButton url="mailto:?subject:Try this fun neurological exam">
      <EmailIcon size={28} round />
    </EmailShareButton>,
    <FacebookShareButton url={fbUrl}>
      <FacebookIcon size={28} round />
    </FacebookShareButton>,
    <LinkedinShareButton url="https://www.linkedin.com/shareArticle?mini=true&url=https://nequest.ai/clock-exam">
      <LinkedinIcon size={28} round />
    </LinkedinShareButton>,
    <TwitterShareButton url="twitter.com/share">
      <TwitterIcon size={28} round />
    </TwitterShareButton>,
    <WhatsappShareButton url="https://api.whatsapp.com/send?text=https%3A%2F%2Fnequest.ai%2Fclock-exam">
      <WhatsappIcon size={28} round />
    </WhatsappShareButton>,
  ];

  const renderSteps = () => {
    if (activeStep === steps.length) {
      return (
        <div className={classes.thankyouContainer}>
          <Typography variant="h4" gutterBottom>
            Thank You
          </Typography>
          <img src="images/brain.png" alt="happy brain infographic" width="200px" />
          <Typography variant="subtitle1">
            You just helped pave the way for the neurological exam of the future, propelling us one step closer to
            bringing an AI-enhanced virtual neurologist visit to you and your loved ones!
          </Typography>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} style={{ textAlign: `left`, paddingTop: `20px` }}>
                <Typography variant="subtitle2" gutterBottom>
                  Share this exam:
                </Typography>
              </Grid>
              {icons.map((icon) => (
                <Grid item sm={1}>
                  {icon}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Divider style={{ margin: `30px 0px` }} />
          <CollectPersonalInfo pk={pk} id={id} />
        </div>
      );
    }

    if (consent) {
      return (
        <>
          {getStepContent({
            step: activeStep,
            personalDetails,
            setPersonalDetails,
            formState,
            setFormState,
            fetchState,
            fetcher,
            silenceAlert,
          })}
          <div className={classes.buttons}>
            {getStepButtons({
              activeStep,
              setActiveStep,
              personalDetails,
              setPersonalDetails,
              formState,
              fetchState,
              fetcher,
            })}
          </div>
        </>
      );
    }

    return <Cover setConsent={setConsent} />;
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Root>
        <main className={classes.layout}>
          <Paper square={false} className={classes.paper}>
            {consent && (
              <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            <>{renderSteps()}</>
          </Paper>
        </main>
      </Root>
    </ThemeProvider>
  );
}
