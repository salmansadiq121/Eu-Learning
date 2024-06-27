import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `api/v1/layout/get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createLayout: builder.mutation({
      query: () => ({
        url: "api/v1/layout/create-layout",
        method: "POST",
        body: "",
        credentials: "include" as const,
      }),
    }),
    updateLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: "api/v1/layout/update-layout",
        method: "PUT",
        body: { type, image, title, subTitle, faq, categories },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetHeroDataQuery,
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
} = layoutApi;
