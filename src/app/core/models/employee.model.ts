import { User } from './user.model';

export interface Employee extends User {
  role: string;
}
