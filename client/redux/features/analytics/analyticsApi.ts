import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: () => ({
        url: `api/v1/analytics/courses-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: `api/v1/analytics/orders-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: `api/v1/analytics/user-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetCourseAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} = analyticsApi;
