import { baseApi, deleteBaseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: postBaseApi<{ usernameOrEmail: string; password: string }>(
      "/auth/login",
      builder
    ),
    postRegister: postBaseApi<{
      username: string;
      email: string;
      password: string;
    }>("/auth/register", builder),
  }),
});

export const { usePostLoginMutation } = authApis;
