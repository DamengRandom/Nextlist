import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import { UserInfoModalProps } from "../../types/user";

export default function UserInfoModal({
  isOpen,
  onClose,
  onSubmit,
  initialUsername,
  initialJobTitle,
}: UserInfoModalProps) {
  const [username, setUsername] = useState(initialUsername || "");
  const [jobTitle, setJobTitle] = useState(initialJobTitle || "");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setUsername(initialUsername || "");
    setJobTitle(initialJobTitle || "");
  }, [initialUsername, initialJobTitle, isOpen]);

  const handleSubmit = () => {
    setIsTouched(true);

    if (username.trim() && jobTitle.trim()) {
      onSubmit(username, jobTitle);
      onClose();
    }
  };

  const handleCancel = () => {
    setIsTouched(false);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent role="dialog" aria-modal="true" aria-labelledby="user-modal-title" borderRadius="none" data-testid="user-info-modal">
        <ModalHeader id="user-modal-title" data-testid="modal-header">User Information</ModalHeader>
        <ModalBody>
          <FormControl mb={4} isInvalid={isTouched && !username?.trim()} data-testid="username-control">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              aria-describedby="username-error"
              data-testid="username-input"
            />
            {isTouched && !username?.trim() && (
              <FormErrorMessage id="username-error" data-testid="username-error">Username is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isTouched && !jobTitle?.trim()} data-testid="job-title-control">
            <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              placeholder="Enter your job title"
              aria-describedby="job-title-error"
              data-testid="job-title-input"
            />
            {isTouched && !jobTitle?.trim() && (
              <FormErrorMessage id="job-title-error" data-testid="job-title-error">Job title is required.</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4}>
            <Button variant="gradient" colorScheme="teal" onClick={handleSubmit} data-testid="submit-button">
              Submit
            </Button>
            <Button colorScheme="blue" onClick={handleCancel} variant='outline' data-testid="cancel-button">
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}