"use client";

import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigation } from "../hooks/useNavigation";

export default function NotFound() {
 const { navigateTo } = useNavigation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      p={4}
    >
      <Heading as="h2" size="xl" mb={4} fontWeight="bold">
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" mb={6}>
        Oops, the requested resource could not be found ..
      </Text>
      <Button
        size="sm"
        variant="gradient"
        colorScheme="teal"
        onClick={() => navigateTo('/')}
      >
        Back to Home
      </Button>
    </Box>
  );
}
