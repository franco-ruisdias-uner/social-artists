export interface IUser {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

export class User implements IUser {
  id: string;
  nombre: string;
  apellido: string;
  email: string;

  constructor(id: string, nombre: string, apellido: string, email: string) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
  }
}