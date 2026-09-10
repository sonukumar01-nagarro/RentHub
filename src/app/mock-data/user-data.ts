import { UserData } from '../user/user.model';

export const userData: UserData[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    role: 'owner',
    password: 'password123',
    favoriteApartments: [1, 3],
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    role: 'renter',
    password: 'password456',
    favoriteApartments: [2, 4, 5],
  },
];
