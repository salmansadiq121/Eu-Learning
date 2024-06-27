import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "api/v1/auth/update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),

    // Edit Profile
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "api/v1/auth/update-UserInfo",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),

    // Update Password
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "api/v1/auth/update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),

    // Get ALl Users
    getAllUsers: builder.query({
      query: () => ({
        url: "api/v1/auth/get-all-users",
        method: "Get",
        credentials: "include" as const,
      }),
    }),
    // Update Role
    updateRole: builder.mutation({
      query: ({ id, role }) => ({
        url: "api/v1/auth/update-user-role",
        method: "PUT",
        body: { id, role },
        credentials: "include" as const,
      }),
    }),
    // Delete User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/v1/auth/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useUpdateRoleMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} = userApi;
