export class Jobs{
    public name: string;
    public employment: string;
    public contractDuration: string;
    public requirments: string;
    // {
    //     public sea-service: string,
    //     public gender: string,
    //     public age: string,
    //     public location: string
    //   }
    public company: string;

    constructor(name: string, employment: string, contractDuration: string, requirments: string, company: string) {
        this.name = name;
        this.employment = employment;
        this.contractDuration = contractDuration;
        this.requirments = requirments;
        this.company = company;

      }
  
}