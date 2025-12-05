import { baseApi, postBaseApi } from "fe-base/apis";

export const contentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Lấy danh sách content theo topic
        getContent: builder.query({
            query: (params) => ({
                url: "/admin/content",
                method: "GET",
                params,
            }),
        }),

        // Lấy chi tiết content
        getContentDetail: builder.query({
            query: (id: string) => ({
                url: `/admin/content/${id}/detail`,
                method: "GET",
            }),
        }),

        // cập nhật content item
        updateContent: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/content/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // ập nhật question
        updateQuestion: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/content/question/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Cập nhật option
        updateOption: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/content/options/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        //  tạo content item
        createContent: builder.mutation({
            query: (data) => ({
                url: "/admin/content",
                method: "POST",
                body: data,
            }),
        }),

        // tạo question
        createQuestion: builder.mutation({
            query: ({ contentItemId, data }) => ({
                url: `/admin/content/${contentItemId}/questions`,
                method: "POST",
                body: data,
            }),
        }),

        // tạo question options
        createQuestionOptions: builder.mutation({
            query: ({ questionId, data }) => ({
                url: `/admin/content/question/${questionId}/options`,
                method: "POST",
                body: data,
            }),
        }),

        //  lấy danh sách topic
        getTopics: builder.query({
            query: (params) => ({
                url: "/admin/catalog/topics",
                method: "GET",
                params,
            }),
        }),
        // xóa 1 topic
        deleteTopic: builder.mutation({
            query: (topicId) => ({
                url: `/admin/catalog/topics/${topicId}`,
                method: "DELETE",
            }),
        }),
        //uppdate topic
        updateTopic: builder.mutation({
            query: ({ topicId, data }) => ({
                url: `/admin/catalog/topics/${topicId}`,
                method: "PUT",
                body: data,
            }),
        }),

        //xóa content 
        deleteContent: builder.mutation({
            query: (contentId) => ({
                url: `/admin/content/${contentId}`,
                method: "DELETE",
            }),
        }),
        //xóa question
        deleteQuestion: builder.mutation({
            query: (questionId) => ({
                url: `/admin/question/${questionId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const topicApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTopic: postBaseApi("/admin/catalog/topics", builder),
    }),
});

export const { useCreateTopicMutation } = topicApi;
export const {
    useUpdateTopicMutation,
    useDeleteContentMutation,
    useDeleteQuestionMutation,
    useDeleteTopicMutation,
    useGetContentQuery,
    useGetContentDetailQuery,
    useUpdateContentMutation,
    useUpdateQuestionMutation,
    useUpdateOptionMutation,
    useCreateContentMutation,
    useCreateQuestionMutation,
    useCreateQuestionOptionsMutation,
    useGetTopicsQuery,
} = contentApi;