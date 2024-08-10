export interface LoginPassParams {
  fingerprint: string;
  username: string;
  password: string;
  g2FaCode?: string;
}

export type KVObject = Record<string, any>;

export interface Bind2faParams {
  g2FaCode: string;
}

export interface BindMachineParams {
  fingerprint: string;
}
