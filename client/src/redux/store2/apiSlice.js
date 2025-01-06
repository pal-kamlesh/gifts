import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "todos",
    }),
    getTodo: builder.query({
      query: (id) => `todos/${id}`,
    }),
    getAllMembers: builder.query({
      queryFn: () => ({ data: "Data from slice" }),
    }),
  }),
});

export default apiSlice;
export const { useGetAllTodosQuery, useGetTodoQuery } = apiSlice;
