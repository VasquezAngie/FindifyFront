import useSignIn from "react-auth-kit/hooks/useSignIn";

export interface IUserData {
  name: string;
  uid: string;
}

const useAuthService = () => {
  const signIn = useSignIn();

  const login = (token: string, userData: IUserData): boolean => {
    return signIn({
      auth: { token, type: "Bearer" },
      userState: { user: userData },
    });
  };

  return { login };
};

export default useAuthService;
