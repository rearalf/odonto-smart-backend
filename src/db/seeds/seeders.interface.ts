export interface IBasicSeeds {
  id: number;
  name: string;
  description: string;
}

export interface IRolePermissionSeed {
  id: number;
  role_id: number;
  permission_id: number;
}

export interface IPerson {
  id: number;
  first_name: string;
  last_name: string;
  person_type_id: number;
  user_id: number;
}
