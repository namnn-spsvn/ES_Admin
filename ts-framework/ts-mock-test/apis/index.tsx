import { baseApi } from "fe-base/apis";

export const mockTestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================
    // MOCK TEST
    // ============================
    getMockTests: builder.query({
      query: () => ({
        url: "/admin/tests",
        method: "GET",
      }),
    }),

    createMockTest: builder.mutation({
      query: (data) => ({
        url: "/admin/tests",
        method: "POST",
        body: data,
      }),
    }),

    updateMockTest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/tests/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteMockTest: builder.mutation({
      query: (id) => ({
        url: `/admin/tests/${id}`,
        method: "DELETE",
      }),
    }),

    // ============================
    // QUESTION OF A MOCK TEST
    // ============================

    getMockTestQuestions: builder.query({
      query: (mockTestId) => ({
        url: `/admin/tests/${mockTestId}/questions`,
        method: "GET",
      }),
    }),

    createMockTestQuestion: builder.mutation({
      query: ({ mock_test_id, ...data }) => ({
        url: `/admin/tests/${mock_test_id}/questions/create-and-add`,
        method: "POST",
        body: data,
      }),
    }),

    updateMockTestQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/tests/questions/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteMockTestQuestion: builder.mutation({
      query: (id) => ({
        url: `/admin/tests/questions/bank/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMockTestsQuery,
  useCreateMockTestMutation,
  useUpdateMockTestMutation,
  useDeleteMockTestMutation,

  // Question hooks
  useGetMockTestQuestionsQuery,
  useCreateMockTestQuestionMutation,
  useUpdateMockTestQuestionMutation,
  useDeleteMockTestQuestionMutation,
} = mockTestApi;
