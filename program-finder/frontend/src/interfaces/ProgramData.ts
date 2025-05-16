export interface ProgramData {
  id: number;
  organization: string;
  services: string;
  type?: string;
  ages?: string;
  zip_code?: string;
  location?: {
    lat: number;
    lng: number;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  isBookmarked?: boolean;
}
