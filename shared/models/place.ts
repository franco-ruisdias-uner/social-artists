interface ICoords {
  lat: number;
  long: number;
}

export interface IPlace {
  id: number;
  title: string;
  description: string;
  coords: ICoords;
  imageUrl: string;
}

export class Place implements IPlace {
  id: number;
  title: string;
  description: string;
  coords: ICoords;
  imageUrl: string;

  constructor(id: number, title: string, description: string, coords: ICoords, imageUrl: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.coords = coords;
    this.imageUrl = imageUrl;
  }


}