export class requestModel {
  public id: string;
  public latitude: number;
  public longitude: number;
  public type: string;
  public status: string;
  public description: string;
  public email: string;

  constructor(
    id: string,
    latitude: number,
    longitude: number,
    type: string,
    status: string,
    description: string,
    email: string) {

      this.id=id;
      this.latitude=latitude;
      this.longitude=longitude;
      this.type=type;
      this.status=status;
      this.description=description;
      this.email=email;

  }

}
