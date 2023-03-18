export class ClinicModels {
    constructor(public _id: number, public clinicName: string,
        public clinic_location: {
            city: string,
            street: String,
            building: Number}) {}
}
