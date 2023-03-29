export class Medicines {
    constructor(
        public _id:number,
        public medicineName:string,
        public companyName: string,
        public speciality: string,
        public description:string
    ){}
    static fromFormValues(formValues: any): Medicines {
        return new Medicines(
          formValues._id,
          formValues.name,
          formValues.companyName,
          formValues.speciality,
          formValues.description
        );
      }
}
