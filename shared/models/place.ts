export interface IPlace {
  id: number
  title: string
  imageUrl: string
  description: string
  likes: number
  comments: string[]
  distance: number
}

export class Place implements IPlace {
  id: number
  comments: string[];
  description: string;
  distance: number;
  imageUrl: string;
  likes: number;
  title: string;

  constructor(id: number, title: string, imageUrl: string, description: string, likes: number, comments: string[], distance: number) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.likes = likes;
    this.comments = comments;
    this.distance = distance;
  }

}