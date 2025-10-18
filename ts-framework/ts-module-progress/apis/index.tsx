import { baseApi, deleteBaseApi, getBaseApi, postBaseApi } from "fe-base/apis";

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlashCard: getBaseApi("/vocab/flashcards", builder),
  }),
});

export const { useGetFlashCardQuery } = authApis;
