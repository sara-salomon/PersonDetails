import { Child } from './Child';
export class User {
  firstName: string;
  lastName: string;
  id: number;
  bornDate: Date=new Date();
  gender: number;
  hMO: string;
 children: Child[] = [];
}