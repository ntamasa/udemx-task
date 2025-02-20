import { UserRole } from './userRole';

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}
