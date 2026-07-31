export interface IUser {
  _id: string;
  username: string;
  email: string;
  image: string;
  role: "user" | "hotelOwner";
  recentSearchedCities: string[];
}
