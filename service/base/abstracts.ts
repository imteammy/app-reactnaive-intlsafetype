abstract class UserServiceAbstacts {
  abstract login: (user: { username: string; password: string }) => Promise<{ token: string; success: boolean }>;
  abstract register: (user: { email?: string; username: string; password: string }) => Promise<boolean>;
  // TODO
  abstract deleteUser?: (user: { username: string; userId: string }) => Promise<boolean>;
  abstract updatePassword?: (value: { userId: string; oldPassword: string; newPassword: string }) => Promise<boolean>;
}

export default UserServiceAbstacts;
