import { baseApi, deleteBaseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export const topicApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopics: builder.query({
            query: (params) => ({
                url: '/admin/catalog/topics',
                method: 'GET',
                params: {
                    skill_id: '68ed254ce5c75afc72ea3c28',
                    level_id: '68ed254ce5c75afc72ea3c2f'
                },
            }),
        }),
    }),
});

export const { useGetTopicsQuery } = topicApis;

