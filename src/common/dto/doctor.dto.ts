export interface IDoctorResponse {
  id: number;
  qualification: string | null;
  specialty: {
    id: number;
    name: string;
    description: string;
  };
  specialties: {
    id: number;
    name: string;
    description: string;
  }[];
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  roles: {
    id: number;
    name: string;
    description: string;
  }[];
  permissions: {
    id: number;
    name: string;
    description: string;
  }[];
}
