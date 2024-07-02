import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "api/v1/course/upload-Course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "api/v1/course/get-all-courses",
        method: "get",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `api/v1/course/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/v1/course/update-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUserAllCourses: builder.query({
      query: () => ({
        url: "api/v1/course/get-courses",
        method: "get",
        credentials: "include" as const,
      }),
    }),
    getCoursesDetails: builder.query({
      query: (id) => ({
        url: `api/v1/course/get-single-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCoursesContent: builder.query({
      query: (id) => ({
        url: `api/v1/course/user-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "api/v1/course/add-question",
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include" as const,
      }),
    }),
    addNewAnswer: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "api/v1/course/add-answer",
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ review, rating, id }) => ({
        url: `api/v1/course/add-review/${id}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),
    addReviewReply: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: "api/v1/course/add-reply-review",
        method: "PUT",
        body: { comment, courseId, reviewId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUserAllCoursesQuery,
  useGetCoursesDetailsQuery,
  useGetCoursesContentQuery,
  useAddNewQuestionMutation,
  useAddNewAnswerMutation,
  useAddReviewMutation,
  useAddReviewReplyMutation,
} = courseApi;
