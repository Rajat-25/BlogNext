import { Response, Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import Blog from '../schemas/blog';
import bookmarkedBlog from '../schemas/bookmarkedBlogs';
import {
  ItemType,
  BlogCreateType,
  BlogType,
  BookmarkBlogType,
  BookmarkType,
  BookmarkUserType,
  Code,
  CustomReq,
  UserType,
} from '../utils';

const router = Router();

router.get(
  '/bulk/:pageNo',
  authMiddleware,
  async (req: CustomReq, res: Response) => {
    const userId = req.userId;

    const pageNo = Number(req.params.pageNo) || 1;
    const limit = 5;
    const skip = (pageNo - 1) * limit;

    const totalBlogs = await Blog.countDocuments({
      author: { $ne: userId },
    });

    const blogs = await Blog.find({
      author: { $ne: userId },
    })
      .populate({
        path: 'author',
        select: 'firstName lastName',
      })
      .skip(skip)
      .limit(limit);

    const isNextPage = skip + blogs.length >= totalBlogs;
    const isPrevPage = pageNo == 1;

    const updatedBlogs = blogs.map((item) => {
      const { _id, title, description, author, createdAt } = item as ItemType;
      const { firstName, lastName } = author as UserType;

      return {
        _id,
        title,
        description,
        createdAt,
        author: firstName + ' ' + lastName,
      };
    });

    const data = await bookmarkedBlog
      .find({
        userId,
      })
      .select('blogId');

    const markData = data.map((item) => item.blogId);

    if (updatedBlogs.length) {
      return res.status(Code.success).json({
        blogs: updatedBlogs,
        isNextPage,
        isPrevPage,
        bookmark: markData,
      });
    } else {
      return res.status(Code.servErr).json({ msg: Code.servMsg });
    }
  }
);

router.get('/user', authMiddleware, async (req: CustomReq, res: Response) => {
  const userId = req.userId;
  const blogs = await Blog.find({
    author: { $in: userId },
  }).populate({
    path: 'author',
    select: 'firstName lastName',
  });

  const updatedBlogs = blogs.map((item) => {
    const { _id, title, description, author, createdAt } = item as ItemType;
    const { firstName, lastName } = author as UserType;
    return {
      _id,
      title,
      description,
      createdAt,
      author: firstName + ' ' + lastName,
    };
  });

  if (blogs) {
    return res.status(Code.success).json(updatedBlogs);
  } else {
    return res.status(Code.servErr).json({ msg: Code.servMsg });
  }
});

router.get(
  '/read/:id',
  authMiddleware,
  async (req: CustomReq, res: Response) => {
    const blogId = req.params.id;
    const blog = await Blog.findOne({
      blogId,
    });

    if (blog) {
      return res.status(Code.success).json(blog);
    } else {
      return res.status(Code.servErr).json({ msg: Code.servMsg });
    }
  }
);

router.post(
  '/create',
  authMiddleware,
  async (req: CustomReq, res: Response) => {
    const userId = req.userId;
    const { title, description } = req.body;

    const { success, error } = BlogCreateType.safeParse(req.body);

    if (!success) {
      return res.status(Code.credErr).json({ msg: Code.credMsg });
    }
    const dbBlog = await Blog.create({
      title,
      description,
      author: userId,
    });

    if (dbBlog) {
      return res.status(Code.success).json({
        msg: 'Blog Created Successfully',
      });
    } else {
      return res.status(Code.servErr).json({ msg: Code.servMsg });
    }
  }
);

router.put(
  '/edit/:id',
  authMiddleware,
  async (req: CustomReq, res: Response) => {
    const data = req.body;
    const blogId = req.params.id;

    const dbBlog = await Blog.findOne({
      _id: blogId,
    });

    try {
      if (dbBlog) {
        const dbBlog = await Blog.updateOne(
          {
            _id: blogId,
          },
          data
        );
        return res
          .status(Code.success)
          .json({ msg: 'Blog Updated Successfully' });
      } else {
        return res.status(Code.credErr).json({ msg: 'Blog not Updated' });
      }
    } catch (err) {
      return res.status(Code.servErr).json({ msg: Code.servMsg });
    }
  }
);

router.delete(
  '/del/:id',
  authMiddleware,
  async (req: CustomReq, res: Response) => {
    const blogId = req.params.id;

    try {
      const dbBlog = await Blog.deleteOne({
        _id: blogId,
      });

      if (dbBlog) {
        return res
          .status(Code.success)
          .json({ msg: 'Blog deleted Successfully' });
      } else {
        return res.status(Code.credErr).json({ msg: 'Blog not exist' });
      }
    } catch (err) {
      return res.status(Code.servErr).json({ msg: Code.servMsg });
    }
  }
);

router.get(
  '/bookmark/fetch',
  authMiddleware,
  async (req: CustomReq, res: Response) => {
    const userId = req.userId;

    const data = await bookmarkedBlog
      .find({
        userId,
      })
      .populate([
        { path: 'blogId', select: 'title description createdAt' },
        { path: 'userId', select: 'firstName lastName' },
      ]);

    if (data) {
      const val = data.map((data) => {
        const { userId, blogId } = data as BookmarkType;
        const { firstName, lastName } = userId as BookmarkUserType;
        const { title, description, createdAt, _id } =
          blogId as BookmarkBlogType;

        return {
          author: firstName + ' ' + lastName,
          title,
          description,
          createdAt,
          _id,
        };
      });

      return res.status(Code.success).json(val);
    } else {
      return res.status(Code.servErr).json({ msg: Code.servMsg });
    }
  }
);

router.post(
  '/bookmark/add',
  authMiddleware,
  async (req: CustomReq, res: Response) => {
    const userId = req.userId;
    const { blogId } = req.body;

    const isExist = await bookmarkedBlog.findOne({
      blogId,
    });

    if (!isExist) {
      const data = await bookmarkedBlog.create({
        userId,
        blogId,
      });

      if (data) {
        return res
          .status(Code.success)
          .json({ msg: 'Bookmarked successfully' });
      } else {
        return res.status(Code.servErr).json({ msg: Code.servMsg });
      }
    } else {
      return res.status(Code.credErr).json({ msg: 'Blog Already bookmarked' });
    }
  }
);

router.delete('/bookmark/del', async (req, res) => {
  try {
    const { blogId } = req.body;
    const result = await bookmarkedBlog.findOneAndDelete({ blogId });
    if (!result) {
      return res.status(Code.notFound).json({ msg: 'Bookmark not found' });
    }
    res.status(Code.success).json({ msg: 'Bookmark removed' });
  } catch (error) {
    res.status(Code.servErr).json({ msg: Code.servMsg });
  }
});

export default router;
