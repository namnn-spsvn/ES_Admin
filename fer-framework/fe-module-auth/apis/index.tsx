import { baseApi, deleteBaseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: postBaseApi<{ usernameOrEmail: string; password: string }>(
      "/auth/login",
      builder
    ),

    postSendCode: postBaseApi<{ email: string }>("/auth/send-code", builder),

    postConfirmCode: postBaseApi<{ email: string }>("/auth/verify", builder),

    postRegister: postBaseApi<{
      username: string;
      email: string;
      password: string;
    }>("/auth/register", builder),

    getUser: getBaseApi<{ id: number }>("/users/profile", builder, {
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  usePostLoginMutation,
  usePostSendCodeMutation,
  usePostConfirmCodeMutation,
  usePostRegisterMutation,
  useLazyGetUserQuery,
  useGetUserQuery,
} = authApis;
