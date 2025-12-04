import {
  baseApi,
  deleteBaseApi,
  getBaseApi,
  postBaseApi,
  putBaseApi,
} from "fe-base/apis";

interface BODY_UPDATE {
  full_name: string;
  gender: string;
  age: number;
  occupation: string;
  avatar_url: any;
}

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: postBaseApi<{ usernameOrEmail: string; password: string }>(
      "/auth/login",
      builder
    ),

    postSendCode: postBaseApi<{ email: string }>("/auth/send-code", builder),

    postConfirmCode: postBaseApi<{ email: string; code: string }>(
      "/auth/verify",
      builder
    ),

    postRegister: postBaseApi<{
      username: string;
      email: string;
      password: string;
    }>("/auth/register", builder),

    getUser: getBaseApi<{ id: string }>("/users/profile", builder, {
      keepUnusedDataFor: 0,
    }),

    editUser: putBaseApi<BODY_UPDATE, { id: string }>(
      "/users/profile",
      builder
    ),
  }),
});

export const {
  usePostLoginMutation,
  usePostSendCodeMutation,
  usePostConfirmCodeMutation,
  usePostRegisterMutation,
  useLazyGetUserQuery,
  useGetUserQuery,
  useEditUserMutation,
} = authApis;
