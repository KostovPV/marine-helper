export interface Jobs{

  age : string;
  position : string;
  imageUrl : string;
  company : string;
  vesselType : string;
  tel : string;
  id : string;
  author : string;
  subscribers : string[]; //to remove

}

// export class Jobs {
//   public age: string;
//   public company: string;
//   public position: string;
//   public imageUrl: string;
//   public vesselType: string;
//   public id: string;
//   public tel: string;
//   public author: string;
//   public subscribers: string[] | undefined;   //to remove


  // constructor(
  //   age: string, company: string, position: string,
  //   imageUrl: string, vesselType: string,
  //   tel: string, id: string, author: string, subscribers: string[]) {
  //   this.age = age;
  //   this.position = position;
  //   this.imageUrl = imageUrl;
  //   this.company = company;
  //   this.vesselType = vesselType;
  //   this.tel = tel;
  //   this.id = id;
  //   this.author = author;
  //   this.subscribers = []; //to remove
  // }