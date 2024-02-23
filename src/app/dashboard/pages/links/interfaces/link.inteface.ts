export interface Link {
  id: number;
  url: string;
  slug: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}
