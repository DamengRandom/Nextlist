import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, Text, Box, HStack, Flex, IconButton, Link, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { AnimeModalNavProps } from "../../types/anilist";
import { GenreTags } from "../Shared/GenreTags";

const AnimeModal: FC<AnimeModalNavProps> = ({ isOpen, onClose, anime, onPrev, onNext, hasPrev, hasNext, type }) => {
  if (!anime) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" motionPreset="slideInBottom" isCentered>
      <ModalOverlay bg="rgba(0,0,0,0.8)" backdropFilter="blur(8px)" />
      <ModalContent role="dialog" aria-modal="true" aria-labelledby="anime-modal-title" borderRadius="none">
        {hasPrev && (
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon boxSize={8} />}
            onClick={onPrev}
            position="absolute"
            left="-60px"
            top="50%"
            transform="translateY(-50%)"
            borderRadius="full"
            boxShadow="lg"
            bg="white"
            _hover={{ bg: "gray.100" }}
            zIndex={2}
            display={{ base: "none", lg: "inline-flex" }}
          />
        )}
        {hasNext && (
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon boxSize={8} />}
            onClick={onNext}
            position="absolute"
            right="-60px"
            top="50%"
            transform="translateY(-50%)"
            borderRadius="full"
            boxShadow="lg"
            bg="white"
            _hover={{ bg: "gray.100" }}
            zIndex={2}
            display={{ base: "none", lg: "inline-flex" }}
          />
        )}
        <ModalHeader id="anime-modal-title">{anime?.title?.english || anime?.title?.romaji}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
            <Box flexShrink={0} minW={{ base: '100%', md: '240px' }}>
              <Image
                src={anime?.coverImage?.large}
                alt={anime?.title?.romaji}
                borderRadius="lg"
                width="100%"
                maxW="240px"
                objectFit="cover"
              />
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                {anime?.title?.english || anime?.title?.romaji}
              </Text>
              <Text fontSize="md" color="gray.700" mb={4} noOfLines={{ base: 6, md: 6, lg: undefined }}>
                {anime?.description?.replace(/<[^>]+>/g, '') || 'No description.'}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={1}>
                Episodes: {anime.episodes || 'N/A'}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={1}>
                Status: {anime?.status || 'N/A'}
              </Text>
              {anime?.genres && <HStack spacing={2} mt={2} flexWrap="wrap">
                <GenreTags genres={anime.genres} />
              </HStack>}
            </Box>
          </Flex>
        </ModalBody>
        <Link href={`/information/${type}/${anime.id}`}>
          <Button variant="gradient" colorScheme="teal" mt={4} w="full" borderRadius="none" rightIcon={<ExternalLinkIcon />}>
            View Details
          </Button>
        </Link>
      </ModalContent>
    </Modal>
  );
};

export default AnimeModal;
