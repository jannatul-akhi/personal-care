export interface UserProfile {
  id: string;
  email: string;
  username: string | null;
  firstName: string;
  lastName: string;
  displayName: string;
  role: string;
  status: string;
  emailVerifiedAt: string | null;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
  isDeleted: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type ErrorTypes = {
  success: boolean;
  message: string;
};
