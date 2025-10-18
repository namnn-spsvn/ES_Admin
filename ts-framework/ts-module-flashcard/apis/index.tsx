import { baseApi, deleteBaseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlashCard: getBaseApi("/vocab/flashcards", builder, {
      keepUnusedDataFor: 0
    })
  }),
});

export const { useGetFlashCardQuery } = authApis;
