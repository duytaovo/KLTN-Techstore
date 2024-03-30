type Role = "User" | "Admin" | "Shipping";

export interface User {
  id: number;
  fullName: string;
  phoneNumber: string;
  password: string;
  email: string;
  gender: string;
  address: string;
  imageUrl: string;
  level: number;
  levelString: string;
  isEnable: true;
}
