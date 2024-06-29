import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiHeaders } from '../../utils';


const blogApi = createApi({
  reducerPath: 'blog_Api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BLOG_URL,
  }),
  tagTypes: [
    'blogs_user',
    'blogs_user_main',
    'blogs_bulk',
    'blogs_bookmark',
    'blogs_bookmark_main',
  ],
  endpoints(builder) {
    return {
      fetchAllBlogs: builder.query<AllBlogsType, AuthToken>({
        providesTags: (res) => {
          const tags: TagType[] = [];
          if (res?.blogs) {
            res.blogs.forEach((item) =>
              tags.push({ type: 'blogs_bulk', id: item._id })
            );
          }

          if (res?.bookmark) {
            res.bookmark.forEach((item) =>
              tags.push({ type: 'blogs_bookmark', id: item })
            );
          }
          tags.push({
            type: 'blogs_bookmark_main',
            id: 'blogs_bookmark_main',
          });
          return tags;
        },
        query: ({ token, pgNo }) => {
          return {
            method: 'GET',
            url: `/bulk/${pgNo}`,
            headers: apiHeaders(token)
          };
        },
      }),

      fetchUserBlogs: builder.query<BlogResponseType[], AuthTokenType>({
        providesTags: (res) => {
          if (res) {
            const tag: TagType[] = res.map((item) => {
              return {
                type: 'blogs_user',
                id: item._id,
              };
            });

            tag.push({
              type: 'blogs_user_main',
              id: 'blogs_user_main',
            });

            return tag;
          }
          return [];
        },
        query: ({ token }) => {
          return {
            method: 'GET',
            url: `/user/`,
            headers: apiHeaders(token),
          };
        },
      }),

      fetchBlog: builder.query<BlogResponseType, BlogReqType>({
        query: ({ token, id }) => {
          return {
            method: 'GET',
            url: `/read/${id}`,
            headers: apiHeaders(token),
          };
        },
      }),

      createBlog: builder.mutation<ResType, CreateBlogReqType>({
        invalidatesTags: (_1) => {
          const tag: TagType[] = [
            {
              type: 'blogs_user_main',
              id: 'blogs_user_main',
            },
          ];
          return tag;
        },

        query: ({ token, blog }) => {
          return {
            method: 'POST',
            url: '/create',
            headers: apiHeaders(token),
            body: blog,
          };
        },
      }),

      editBlog: builder.mutation<ResType, EditBlogType>({
        invalidatesTags: (_1, _2, arg) => {
          if (arg) {
            const tag: TagType[] = [
              {
                type: 'blogs_user',
                id: arg.id,
              },
            ];

            return tag;
          }
          return [];
        },
        query: ({ token, id, blog }) => {
          return {
            method: 'PUT',
            url: `/edit/${id}`,
            headers: apiHeaders(token),
            body: blog,
          };
        },
      }),

      deleteBlog: builder.mutation<ResType, BlogReqType>({
        invalidatesTags: (_1, _2, arg) => {
          if (arg) {
            const tag: TagType[] = [
              {
                type: 'blogs_user',
                id: arg.id,
              },
            ];
            return tag;
          }
          return [];
        },
        query: ({ token, id }) => {
          return {
            method: 'DELETE',
            url: `/del/${id}`,
            headers: apiHeaders(token),
          };
        },
      }),

      fetchBookmarkedBlog: builder.query<BlogResponseType[], AuthTokenType>({
        providesTags: (res) => {
          const tags: TagType[] = [];
          if (res) {
            res.forEach((item) => {
              tags.push({
                type: 'blogs_bookmark',
                id: item._id,
              });
            });

            tags.push({
              type: 'blogs_bookmark_main',
              id: 'blogs_bookmark_main',
            });
          }
          return tags;
        },
        query: ({ token }) => {
          return {
            method: 'GET',
            url: '/bookmark/fetch',
            headers: apiHeaders(token),
          };
        },
      }),

      addBookmarkBlog: builder.mutation<ResType, BookmarkType>({
        invalidatesTags: (_1) => {
          return [{ type: 'blogs_bookmark_main', id: 'blogs_bookmark_main' }];
        },
        query: ({ token, blogId }) => {
          return {
            method: 'POST',
            url: '/bookmark/add',
            headers: apiHeaders(token),
            body: { blogId },
          };
        },
      }),

      removeBookmarkBlog: builder.mutation<ResType, BookmarkType>({
        invalidatesTags: (_1, _2, arg) => {
          return [
            {
              type: 'blogs_bookmark',
              id: arg.blogId,
            },
          ];
        },
        query: ({ token, blogId }) => {
          return {
            method: 'DELETE',
            url: '/bookmark/del',
            headers: apiHeaders(token),
            body: { blogId },
          };
        },
      }),
    };
  },
});

export const {
  useRemoveBookmarkBlogMutation,
  useFetchBookmarkedBlogQuery,
  useAddBookmarkBlogMutation,
  useFetchAllBlogsQuery,
  useFetchBlogQuery,
  useFetchUserBlogsQuery,
  useEditBlogMutation,
  useDeleteBlogMutation,
  useCreateBlogMutation,
} = blogApi;
export const blogReducer = blogApi.reducer;
export default blogApi;
