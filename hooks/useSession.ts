import { Session } from "next-auth";
import { getSession, useSession as _useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type SessionState = {
  loading: boolean,
  session: Session | null
}

function useSession() {
  const { data, } = _useSession();
  const [state, setState] = useState<SessionState>({
    loading: true,
    session: null
  });

  useEffect(() => {
    getSession()
      .then((session) => {
        setState({
          loading: false,
          session,
        });
      })
      .catch();
  }, []);

  useEffect(() => {
    setState(prev => ({ ...prev, session: data }));
  }, [data]);

  return state;
}

export default useSession;