export interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string, jobTitle: string) => void;
  initialUsername: string;
  initialJobTitle: string;
}
