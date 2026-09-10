import { CommentDetails } from '../comment-box/comment.model';

export interface Apartment {
  id: number;
  name: string;
  title: string;
  type: string;
  image: string;
  rent: number;
  location: string;
  description: string;
  isShared: boolean;
  areaInSqFeet: string;
  isFurnished: boolean;
  amenities: string[];
  owner: string;
  stayType?: string;
  isNegotiable?: boolean;
  comments?: CommentDetails[];
}
