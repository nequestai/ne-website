import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

import CountrySelect from '../country-select';

function RadioButtonsGroup({ gender, setGender, personalDetails }) {
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const helperText =
    !gender && personalDetails ? (
      <span style={{ color: '#3f51b5', paddingLeft: '15px' }}>Please select your gender</span>
    ) : (
      <></>
    );

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

const getHelperText = (age, personalDetails) => {
  if (!age && personalDetails) {
    return <span style={{ color: '#3f51b5', paddingLeft: '15px' }}>Please enter your age</span>;
  }
  if (age && parseInt(age, 10) < 0) {
    return <span style={{ color: '#3f51b5', paddingLeft: '15px' }}>Please enter a valid age</span>;
  }
  return <></>;
};

export default function PersonalDetails({ personalDetails, setFormState }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState();
  const [conditions, setConditions] = useState('');
  const [other, setOther] = useState('');

  useEffect(() => {
    if (age && parseInt(age, 10) > 0 && gender && country && country.label && conditions) {
      setFormState({
        age,
        gender,
        country,
        conditions,
        other,
      });
    }
  }, [age, gender, country, conditions, other]);

  return (
    <Grid container spacing={3} style={{ paddingLeft: '30px' }}>
      <Grid item xs={12}>
        <Typography variant="h6">Personal Details</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="age"
          name="age"
          label="Age"
          type="number"
          variant="outlined"
          value={age}
          onChange={(event) => {
            setAge(event.target.value);
          }}
          helperText={getHelperText(age, personalDetails)}
          required
        />
      </Grid>
      <Grid item xs={10}>
        <RadioButtonsGroup gender={gender} setGender={setGender} personalDetails={personalDetails} />
      </Grid>
      <Grid item xs={10}>
        <CountrySelect country={country} setCountry={setCountry} showError={personalDetails} />
      </Grid>
      <Grid item xs={10}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="existing-conditions-label" required>
            <span>Existing Conditions</span>
          </InputLabel>
          <Select
            id="current-conditions"
            value={conditions}
            name="Existing Conditions"
            variant="outlined"
            onChange={(evt) => {
              setConditions(evt.target.value);
            }}
            label="Age"
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Tremor/Parkinsons">Tremor/Parkinsons</MenuItem>
            <MenuItem value="Dementia/Alzheimers">Dementia/Alzheimers</MenuItem>
            <MenuItem value="Stroke">Stroke</MenuItem>
          </Select>
          {!conditions && personalDetails ? (
            <span
              style={{
                color: '#3f51b5',
                paddingLeft: '10px',
                fontSize: '0.75rem',
                lineHeight: '1.5rem',
              }}
            >
              Please select an option
            </span>
          ) : (
            <></>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={10}>
        <TextField
          id="other"
          name="other"
          label="Other (Please Explain)"
          variant="outlined"
          value={other}
          onChange={(event) => {
            setOther(event.target.value);
          }}
          multiline
          rows={2}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
