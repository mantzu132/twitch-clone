// Hook which is going to be used to create an identity of the user who is trying to watch our stream.
// we will have info who is watching our stream, what is their token, what is their identity, name. Using that info we will be able to kick users
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createViewerToken } from "@/actions/token";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodedToken?.name;
        const identity = decodedToken.jti;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
