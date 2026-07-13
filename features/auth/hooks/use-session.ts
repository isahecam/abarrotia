import { authClient } from "@/lib/auth-client"; // import the auth client

export const useSession = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
    isRefetching, //refetching state
  } = authClient.useSession();

  return {
    session,
    isPending,
    error,
    refetch,
    isRefetching,
  };
};
