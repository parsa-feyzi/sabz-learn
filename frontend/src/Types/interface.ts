import type { T_FormValues, T_userInfos } from "./type";

export interface I_errorMessagesContext {
    errorMessages: T_FormValues | undefined;
    setErrorMessages: React.Dispatch<React.SetStateAction<T_FormValues>> | undefined;
}

export interface I_AuthInfos {
    isLogin: boolean;
    token: string | null;
    userInfos: T_userInfos | null;
  }