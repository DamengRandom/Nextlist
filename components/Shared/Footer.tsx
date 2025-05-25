import { Box, Text, Flex } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const version = "v1.0.1";

  return (
    <Box as="footer" bgGradient="linear(to-r, teal.500, blue.500)" color="white" boxShadow="md" p={4}>
      <Flex
        maxW="container.xl"
        mx="auto"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="sm">
          &copy; {currentYear} DamengRandom made with{" "}
          <Text as="span" color="red.500" mx={1}>&hearts;</Text> - {version}
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
