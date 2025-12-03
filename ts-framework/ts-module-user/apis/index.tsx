import { baseApi, getBaseApi, postBaseApi, putBaseApi } from "fe-base/apis";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  danh sách user
    getAllUser: getBaseApi("users/allUsers", builder, {
      keepUnusedDataFor: 0,
    }),

    // thêm mới user
    createUser: builder.mutation({
      query: (data) => ({
        url: "users/new",
        method: "POST",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    })

  }),
});

export const {
 useGetAllUserQuery,
 useCreateUserMutation,
 useDeleteUserMutation
} = userApi;
