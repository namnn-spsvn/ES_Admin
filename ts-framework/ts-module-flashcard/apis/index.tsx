import { baseApi, getBaseApi, postBaseApi, putBaseApi } from "fe-base/apis";

export const flashcardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  danh sách flashcards
    getFlashcardById: getBaseApi("vocab/flashcards", builder, {
      keepUnusedDataFor: 0,
    }),

    //  danh sách topic FLASHCARD
    getFlashCard: getBaseApi("/admin/catalog/topics?type=FLASHCARD", builder, {
      keepUnusedDataFor: 0,
    }),

    // thêm mới flashcard
    createFlashcard: builder.mutation({
      query: (data) => ({
        url: "vocab/flashcards",
        method: "POST",
        body: data,
      }),
    }),

    //  cập nhật
    updateFlashcard: builder.mutation({
      query: ({ id, data }) => ({
        url: `vocab/flashcards/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    //api xóa 1 
    deleteFlashcard: builder.mutation({
      query: (id) => ({
        url: `/vocab/flashcards/${id}`,
        method: "DELETE",
      }),
    }),

  }),
});

export const {
  useGetFlashcardByIdQuery,
  useGetFlashCardQuery,
  useCreateFlashcardMutation,
  useUpdateFlashcardMutation,
  useDeleteFlashcardMutation
} = flashcardApi;
