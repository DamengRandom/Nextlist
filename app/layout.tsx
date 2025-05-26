'use client';

import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { Box, Center, ChakraProvider, Text } from "@chakra-ui/react";
import UserInfoModal from "../components/User/UserInfoModal";
import client from "../lib/apolloClient";
import theme from "../theme";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { useUserStore } from "../lib/store/userStore";
import Head from "next/head";
import ErrorBoundary from "../components/Shared/ErrorBoundary";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { username, jobTitle, setUsername, setJobTitle } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [hydrated, setHydrated] = useState(false);

  const handleModalSubmit = (name: string, title: string) => {
    setUsername(name);
    setJobTitle(title);
    setIsModalOpen(false);
  };

  const handleEdit = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setIsModalOpen(!(username && jobTitle));
  }, [username, jobTitle]);

  if (!hydrated) return null;

  return (
    <html lang="en">
      <Head>
        <title>Nextlist</title>
        <meta name="description" content="A page to show anime list of data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#319795" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ChakraProvider theme={theme}>
          <Box display="flex" flexDirection="column" minH="100vh">
            <Navbar handleEdit={handleEdit} username={username} />
            <Box flex="1" bg="white">
              {username && jobTitle && (
                <ApolloProvider client={client}>
                  <ErrorBoundary>
                  {children}
                  </ErrorBoundary>
                </ApolloProvider>
              )} 
              {hydrated && !username && (
                <Center minH="calc(100vh - 125px)">
                  <Text>Please sign in to view the animes ~</Text>
                </Center>
              )}
            </Box>
            <Footer />
          </Box>
          <UserInfoModal
            isOpen={isModalOpen}
            onClose={handleClose}
            onSubmit={handleModalSubmit}
            initialUsername={username}
            initialJobTitle={jobTitle}
          />
        </ChakraProvider>
      </body>
    </html>
  );
}
