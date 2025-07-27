export interface MUser {
  usrid: number;
  email: string | null;
  usrpw: string | null;
  crtdt: string;
  crtby: string | null;
  primg: string | null;
}

export interface UserUpdatePayload {
  usrid: number;
  email: string | null;
  usrpw: string | null;
  primg: string | null;
  curpw: string | null;
  newpw: string | null;
  conpw: string | null;
}
