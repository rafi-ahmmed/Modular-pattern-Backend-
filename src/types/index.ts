export const USER_ROLE = {
   user: 'user',
   admin: 'admin',
   agent: 'agent',
} as const;

export type ROLES = 'user' | 'admin' | 'agent';
