import React from 'react';
import { ThemeUIProvider, Box, Container } from 'theme-ui';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import theme from 'theme';

import ClockAndSpiralExam from 'components/clock-exam/ClockAndSpiralExam';

const client = new ApolloClient({
  uri: 'https://api.baseql.com/airtable/graphql/appqxKBP43iCHVXuf',
  cache: new InMemoryCache(),
});

const styles = {
  layout: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
      fontFamily: 'Nunito',
    },
  },
  contentWrapper: {
    display: [null, null, null, 'flex', 'grid'],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: [null, null, null, null, null, '100vh'],
    pt: [null, null, null, 0, null, 0, 0],
  },
  content: {
    maxWidth: [507, null, null, 324, 450],
    fontFamily: 'Nunito',
  },
  text: {
    color: 'textSecondary',
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
};

export default function IndexPage() {
  return (
    <ApolloProvider client={client}>
      <ThemeUIProvider theme={theme}>
        <Container>
          <Box sx={styles.contentWrapper}>
            <ClockAndSpiralExam />
          </Box>
        </Container>
      </ThemeUIProvider>
    </ApolloProvider>
  );
}
