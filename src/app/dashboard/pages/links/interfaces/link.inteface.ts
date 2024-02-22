export interface Link {
  id: number;
  url: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
