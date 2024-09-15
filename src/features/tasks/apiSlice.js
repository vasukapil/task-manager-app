import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    fetchTasks: builder.query({
      query: () => 'todos',
      providesTags: ['Task'],
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: 'todos/add',
        method: 'POST',
        body: newTask,
      }),
      async onQueryStarted(newTask, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('fetchTasks', undefined, (draft) => {
            draft.todos.push({ ...newTask, id: Date.now() });
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('fetchTasks', undefined, (draft) => {
              const index = draft.todos.findIndex((task) => task.id === Date.now());
              if (index !== -1) {
                draft.todos[index] = data;
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, updatedTask }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: updatedTask,
      }),
      async onQueryStarted({ id, updatedTask }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('fetchTasks', undefined, (draft) => {
            const taskIndex = draft.todos.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
              draft.todos[taskIndex] = { ...draft.todos[taskIndex], ...updatedTask };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('fetchTasks', undefined, (draft) => {
            draft.todos = draft.todos.filter((task) => task.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;