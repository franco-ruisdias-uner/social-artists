export interface IPost {
  id: number
  user: string
  imageUrl: string
  description: string
  likes: number
  comments: string[]
  distance: number
}

export class Post implements IPost {
  id: number
  comments: string[];
  description: string;
  distance: number;
  imageUrl: string;
  likes: number;
  user: string;

  constructor(id: number, user: string, imageUrl: string, description: string, likes: number, comments: string[], distance: number) {
    this.id = id;
    this.user = user;
    this.imageUrl = imageUrl;
    this.description = description;
    this.likes = likes;
    this.comments = comments;
    this.distance = distance;
  }

}