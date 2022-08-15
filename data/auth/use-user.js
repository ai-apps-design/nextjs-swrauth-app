import useSWR from "swr";

import userFetcher, { mock_user_api } from "/lib/auth/api-user";

export default function useUser() {
  // const { data, mutate, error } = useSWR("api_user", userFetcher);
  const { data, mutate, error } = useSWR("api_user", mock_user_api);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
}

