'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserInfoModal from '../../components/User/UserInfoModal';
import { useUserStore } from '../../lib/store/userStore';

export default function UserInfoPage() {
  const [isOpen, setIsOpen] = useState(true);
  const { setUsername, setJobTitle } = useUserStore();
  const router = useRouter();

  const handleSubmit = (username: string, jobTitle: string) => {
    document.cookie = `user-info=${encodeURIComponent(JSON.stringify({ username, jobTitle }))}; path=/;`;
    setUsername(username);
    setJobTitle(jobTitle);
    
    setIsOpen(false);

    router.push('/');
  };

  return (
    <UserInfoModal
      isOpen={isOpen}
      onSubmit={handleSubmit}
      disableClose={true}
    />
  );
}