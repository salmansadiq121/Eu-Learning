import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: "api/v1/order/getAll-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
