import { Request } from 'express';
import { Types } from 'mongoose';
import z from 'zod';

enum Code {
  success = 201,
  credErr = 401,
  notFound = 404,
  servErr = 500,
  servMsg = 'Internal Server error',
  credMsg = 'Invalid credentials',
}

type BlogType = {
  title: string;
  description: string;
  author: string;
  createdAt?: Date;
};

//zod
const BlogCreateType = z.object({
  title: z.string(),
  description: z.string(),
  id: z.string(),
});

const signUpBody = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

const signInBody = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type BookmarkUserType = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
};

type BookmarkBlogType = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  createdAt: string;
};

type BookmarkType = {
  _id: Types.ObjectId;
  userId: Types.ObjectId | BookmarkUserType;
  blogId: Types.ObjectId | BookmarkBlogType;
  __v: number;
};

interface CustomReq extends Request {
  userId?: string;
}

type UserType = {
  firstName: string;
  lastName: string;
  _id: Types.ObjectId;
};

type ItemType = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  author: Types.ObjectId | UserType;
  createdAt: string;
};

export {
  BlogCreateType, BlogType, BookmarkBlogType, BookmarkType, BookmarkUserType, Code, CustomReq, ItemType,
  UserType, signInBody,
  signUpBody
};

