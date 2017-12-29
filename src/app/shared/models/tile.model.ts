export class Tile {
  public id:                  number;
  public name:                string;
  public description:         string;

  constructor(product: any = null) {
    this.id                 = product ? product.Id : null;
    this.name               = product ? product.Name : '';
    this.description        = product ? product.Description : '';
  }
}
