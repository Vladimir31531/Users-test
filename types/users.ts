export interface IUser {
  id: string;
  name: string;
  login: string;
  group: string;
  active: boolean;
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
