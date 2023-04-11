export interface Message {
  fromSelf: boolean;
  message: string;
  image?: string;
}

export interface User {
  username: string;
  email: string;
  isAvatarImageSet: boolean;
  _id: string;
  password: string;
  __v?: number;
  avatarImage: string;
}
