type URole = 'admin' | 'agent' | 'user';

export interface IUser {
   name: string;
   email: string;
   password: string;
   age: number;
   role?: URole; //admin ,agent, user
   is_active?: boolean;
}
