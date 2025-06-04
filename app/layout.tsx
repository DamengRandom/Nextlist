'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '../lib/store/userStore';
import { Box, ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Shared/Navbar';
import { ApolloProvider } from '@apollo/client';
import ErrorBoundary from '../components/Shared/ErrorBoundary';
import theme from '../theme';
import Footer from '../components/Shared/Footer';
import client from '../lib/apolloClient';
import UserInfoModal from '../components/User/UserInfoModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { username, setUsername, setJobTitle } = useUserStore();
  const handleEdit = () => setModalOpen(true);
  const handleModalSubmit = (newUsername: string, newJobTitle: string) => {
    setUsername(newUsername);
    setJobTitle(newJobTitle);
    setModalOpen(false);
  };
  
  useEffect(() => {
    const match = document.cookie.match(/user-info=([^;]+)/);
    if (match) {
      try {
        const { username, jobTitle } = JSON.parse(decodeURIComponent(match[1]));
        setUsername(username);
        setJobTitle(jobTitle);
      } catch {
        throw new Error('Need to lofin first ~');
      }
    }
  }, [setUsername, setJobTitle]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Nextlist Anime app (Lite version)" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <Box display="flex" flexDirection="column" minH="100vh">
            <Navbar handleEdit={handleEdit} username={username} />
            <Box flex="1" bg="white">
              <ApolloProvider client={client}>
                <ErrorBoundary>
                {children}
                </ErrorBoundary>
              </ApolloProvider>
            </Box>
            <Footer />
          </Box>
          <UserInfoModal
            isOpen={isModalOpen}
            onSubmit={handleModalSubmit}
            onClose={() => setModalOpen(false)}
          />
        </ChakraProvider>
      </body>
    </html>
  );
}
