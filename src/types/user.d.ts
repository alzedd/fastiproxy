import AuthenticatedUser from './authenticatedUser';

export type User = AuthenticatedUser & {
  password: string;
  createdAt: number;
  modifiedAt: number;
  deleteAt: number;
  deleted: boolean;
};
