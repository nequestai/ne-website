import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { MenuItem, Select, Typography, Grid, TextField, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

let suffix = '';

if (process.env.NODE_ENV === 'development') {
  suffix = 'Dev';
}

const INSERT_CONTACT = gql`
  mutation insertContactInfo${suffix}(
    $name: String!,
    $email: String!,
    $reference: Float!
  ) {
    insert_contactInfo${suffix}(
      name: $name,
      email: $email,
      reference: $reference
    ) {
      id
    }
  }
`;

const INSERT_SOURCE = gql`
  mutation insertSource${suffix}(
    $id: String!
    $referral: String
    $source: String!
  ) {
    update_experiment1${suffix}(id: $id, referral: $referral, source: $source) {
      id
    }
  }
`;

const CollectPersonalInfo = ({ pk, id }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [insertContactInfo] = useMutation(INSERT_CONTACT);
  const [insertSource] = useMutation(INSERT_SOURCE);
  const [source, handleSource] = useState('');
  const [referral, handleReferral] = useState('');
  const [timeout, updateTimeout] = useState(false);

  useEffect(() => {
    if (source) {
      if (((source && referral) || (source && source !== 'referral')) && !timeout) {
        setTimeout(() => {
          updateTimeout(true);
        }, 1000);
      }
      insertSource({
        variables: {
          id,
          source,
          referral,
        },
      });
    }
  }, [referral, source, id]);

  return (
    <Grid container spacing={4}>
      {!isSubmitted ? (
        <>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ color: '#3f51b5' }}>
                  Join the NEquest family
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Let&apos;s build something great!</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (email && name) {
                  insertContactInfo({
                    variables: {
                      name,
                      email,
                      reference: parseFloat(pk),
                    },
                  });
                  setIsSubmitted(true);
                }
              }}
              disabled={!email || !name}
            >
              Sign Up
            </Button>
          </Grid>
        </>
      ) : (
        <span>
          <FavoriteIcon color="primary" />
          <span>
            &nbsp;<b>NE</b>quest
          </span>
        </span>
      )}

      {((source && referral) || (source && source !== 'referral')) && !timeout && <span>👍</span>}

      {(!source || source === 'referral') && !referral && (
        <Grid item xs={12}>
          <div style={{ textAlign: 'left' }}>How did you find out about us?</div>
        </Grid>
      )}

      {(!source || source === 'referral') && !referral && (
        <Grid item xs={8}>
          {(!source || source === 'referral') && !referral && (
            <Select
              id="referral"
              onChange={(evt) => handleSource(evt.target.value)}
              value={source}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="search-engine">Search Engine</MenuItem>
              <MenuItem value="neurological-foundation">Neurological Foundation</MenuItem>
              <MenuItem value="medical-professional">Medical Professional</MenuItem>
              <MenuItem value="referral">Referral</MenuItem>
            </Select>
          )}
          <br />
          <br />
          {source === 'referral' && !referral && (
            <Select variant="outlined" fullWidth onChange={(evt) => handleReferral(evt.target.value)}>
              <MenuItem value="anne">Anne Milner</MenuItem>
              <MenuItem value="janice">Janice Hu</MenuItem>
              <MenuItem value="michael">Michael Olorunninwo</MenuItem>
              <MenuItem value="nupur">Nupur Bindal</MenuItem>
              <MenuItem value="satya">Satya Sampathirao</MenuItem>
              <MenuItem value="sheela">Sheela Toprani</MenuItem>
              <MenuItem value="simen">Simen Oestmo</MenuItem>
              <MenuItem value="talal">Talal Muzaffar</MenuItem>
              <MenuItem value="vidit">Vidit Gautam</MenuItem>
            </Select>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default CollectPersonalInfo;
