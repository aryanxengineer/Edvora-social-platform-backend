export interface ISignUpUser extends Document {
  fullname: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  dateOfBirth: Date;
  profilePicture?: string;
  gender?: number; // 0 = male, 1 = female, 2 = other (example)
}

export interface ISignInUser extends Document {
  username?: string;
  email?: string;
  phoneNumber?: string;
  password: string;
}
