export type Role = 'owner' | 'renter';
export interface UserData {
  id: number;
  email: string;
  role: Role;
  password: string;
  favoriteApartments: number[]; // Array of apartment IDs that the user has favorited
}

export interface DisplayUser extends Pick<UserData, 'email' | 'role' | 'favoriteApartments'> {}
