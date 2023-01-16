import { Role } from '@modules/staff/types';

export interface JwtPayload {
  id: string;
  role: Role;
}
