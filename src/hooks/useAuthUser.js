// import { useQuery } from "@tanstack/react-query";
// import { getAuthUser } from "../lib/api";

// const useAuthUser = () => {
//   const authUser = useQuery({
//     queryKey: ["authUser"],
//     queryFn: getAuthUser,
//     retry: false, // auth check
//   });

//   return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
// };
// export default useAuthUser;

// import { useQuery } from "@tanstack/react-query";
// import { getAuthUser } from "../lib/api";

// const useAuthUser = () => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: getAuthUser,
//     staleTime: Infinity, // cache forever
//     retry: false, // don't retry if unauthenticated
//   });

//   return {
//     isLoading,
//     isError,
//     authUser: data?.user ?? null,
//   };
// };

// export default useAuthUser;


import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    staleTime: Infinity, // cache forever
    retry: false, // don't retry if unauthenticated
  });

  return {
    isLoading,
    isError,
    authUser: data?.user ?? null,
  };
};

export default useAuthUser;
