import { useAppSelector } from '../app/hooks';

export const getCurrentUser = state => state.currentUser.user;