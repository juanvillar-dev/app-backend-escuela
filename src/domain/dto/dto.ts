// Tipo que describe cualquier clase con un método estático create
export type DTOClass<T> = {
  create(obj: any): T;
};
