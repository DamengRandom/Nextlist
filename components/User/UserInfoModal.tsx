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

interface UserInfoModalProps {
  isOpen: boolean;
  onSubmit: (username: string, jobTitle: string) => void;
  disableClose?: boolean;
  onClose?: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onSubmit, disableClose, onClose }) => {
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setUsername("");
    setJobTitle("");
    setIsTouched(false);
  }, [isOpen]);

  const handleSubmit = () => {
    if (username.trim() && jobTitle.trim()) {
      onSubmit(username, jobTitle);
      if (onClose) onClose();
    } else {
      setIsTouched(true);
    }
  };

  const handleCancel = () => {
    setIsTouched(false);
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent role="dialog" aria-modal="true" aria-labelledby="user-modal-title" borderRadius="none" data-testid="user-info-modal">
        <ModalHeader id="user-modal-title" data-testid="modal-header">User Information</ModalHeader>
        <ModalBody>
          <FormControl mb={4} isInvalid={isTouched && !username.trim()} data-testid="username-control">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              aria-describedby="username-error"
              data-testid="username-input"
            />
            {isTouched && !username.trim() && (
              <FormErrorMessage id="username-error" data-testid="username-error">Username is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isTouched && !jobTitle.trim()} data-testid="job-title-control">
            <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              placeholder="Enter your job title"
              aria-describedby="job-title-error"
              data-testid="job-title-input"
            />
            {isTouched && !jobTitle.trim() && (
              <FormErrorMessage id="job-title-error" data-testid="job-title-error">Job title is required.</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4}>
            <Button variant="gradient" colorScheme="teal" onClick={handleSubmit} data-testid="submit-button">
              Submit
            </Button>
            <Button colorScheme="blue" onClick={handleCancel} variant='outline' data-testid="cancel-button" disabled={disableClose}>
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UserInfoModal;
