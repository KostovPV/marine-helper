export class Jobs{
    public age: string;
    public company: string;
    public position: string;
    public imageUrl: string;

    public vesselType: string;
    public id: string;
    // {
    //     public sea-service: string,
    //     public gender: string,
    //     public age: string,
    //     public location: string
    //   }
    public tel: string;

    constructor(age: string, company: string, position: string,
       requirments: string, imageUrl: string, vesselType: string,
       tel:string, id: string) {
        this.age = age;
        this.company = company;
        this.position = position;
        this.imageUrl = imageUrl;
        this.company = company;
        this.vesselType = vesselType;
        this.tel = tel;
        this.id=id;

      }
  
}