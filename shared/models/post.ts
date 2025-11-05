import {User} from "./user";

export interface IPost {
  _id: string
  user: User
  imageUrl: string
  text: string
  likes: number
  comments: string[]
  distance: number
}

export class Post implements IPost {
  _id: string
  comments: string[];
  text: string;
  distance: number;
  imageUrl: string;
  likes: number;
  user: User;

  constructor(_id: string, user: User, imageUrl: string, description: string, likes: number, comments: string[], distance: number) {
    this._id = _id;
    this.user = user;
    this.imageUrl = imageUrl;
    this.text = description;
    this.likes = likes;
    this.comments = comments;
    this.distance = distance;
  }

}