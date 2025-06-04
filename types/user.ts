export interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  disableClose: boolean;
  onSubmit: (username: string, jobTitle: string) => void;
  initialUsername: string;
  initialJobTitle: string;
}
