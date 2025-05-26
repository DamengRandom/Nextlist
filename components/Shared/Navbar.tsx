import { Flex, Box, Button, Heading, Spacer } from "@chakra-ui/react";
import { useAnimeStore } from "../../lib/store/animeStore";
import { useNavigation } from "../../hooks/useNavigation";

type NavbarProps = {
  handleEdit: () => void;
  username: string | null;
}

export default function Navbar({ handleEdit, username }: NavbarProps) {
  const { reset } = useAnimeStore();
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    navigateTo('/');
    reset();
  }

  return (
    <Flex as="nav" align="center" justify="space-between" padding={4} bgGradient="linear(to-r, teal.500, blue.500)" color="white" boxShadow="md">
      <Box>
        <Heading size="lg" textShadow="0 1px 2px rgba(0,0,0,0.5)" cursor="pointer" onClick={handleClick}>Nextlist</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button
          aria-pressed={!!username}
          onClick={handleEdit}
          variant="outline"
          color="white"
          border="2px solid transparent"
          backgroundClip="padding-box"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
            margin: "-2px",
            borderRadius: "inherit",
            background: "linear-gradient(45deg, var(--chakra-colors-pink-500), var(--chakra-colors-blue-400))",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
          _hover={{
            _before: {
              opacity: 1,
            },
            transform: "scale(1.02)",
          }}
        >
          {username ? `Hello ${username}` : "Sign In"}
        </Button>
      </Box>
    </Flex>
  );
}