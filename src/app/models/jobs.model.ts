export class Jobs {
  public age: string;
  public company: string;
  public position: string;
  public imageUrl: string;
  public vesselType: string;
  public id: string;
  public tel: string;

  constructor(
    age: string, company: string, position: string,
    imageUrl: string, vesselType: string,
    tel: string, id: string) {
    this.age = age;
    this.position = position;
    this.imageUrl = imageUrl;
    this.company = company;
    this.vesselType = vesselType;
    this.tel = tel;
    this.id = id;

  }

}