import { extendTheme } from "@chakra-ui/react";

// Try to introduce a gradient button for usage
const theme = extendTheme({
  components: {
    Button: {
      variants: {
        gradient: {
          bgGradient: "linear(to-r, teal.400, blue.500)",
          color: "white",
          transition: "background 0.3s ease",
          boxShadow: "md",
          _hover: {
            bgGradient: "linear(to-r, teal.600, blue.700)",
            boxShadow: "lg",
            _disabled: {
              bgGradient: "linear(to-r, gray.400, gray.500)",
              cursor: "not-allowed",
              boxShadow: "md",
            },
          },
          _active: {
            boxShadow: "md",
          },
          _disabled: {
            bgGradient: "linear(to-r, teal.400, blue.500)",
            color: "whiteAlpha.700",
            cursor: "not-allowed",
            boxShadow: "none",
          },
        },
      }
    },
  },
});

export default theme;
