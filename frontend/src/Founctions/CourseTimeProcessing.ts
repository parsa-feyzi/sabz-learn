import type { T_sessions } from "../Types/type";

export const courseTimeProcessing = (sessions: [] | T_sessions[]) => {
  const courseTime = sessions.length
    ? (
        (sessions.reduce((a, b: any) => {
          const firtSession = parseInt(a.time);
          const nextSession =
            (b as number) / 1 === b ? b : parseInt((b as T_sessions).time);
          return firtSession + nextSession;
        }) as any) / 60
      ).toFixed()
    : "0";
  return courseTime;
};