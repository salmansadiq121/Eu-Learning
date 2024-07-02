import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegisteration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegisterationData = {};

export const authApi: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint here
    register: builder.mutation<RegistrationResponse, RegisterationData>({
      query: (data) => ({
        url: "api/v1/auth/register-user",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegisteration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    // Activation Account
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "api/v1/auth/activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
    // Login
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "api/v1/auth/login-user",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    // Social Auth
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "api/v1/auth/social-auth",
        method: "POST",
        body: { email, name, avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    // Logout User
    logOut: builder.mutation({
      query: () => ({
        url: "api/v1/auth/logoutUser",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutMutation,
} = authApi;
