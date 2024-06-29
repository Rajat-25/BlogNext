/// <reference types="vite/client" />

// Pages

type FieldTypeSi = {
  type: string;
  placeholder: string;
  id: string;
  label: string;
  key: string;
  name: string;
};

type SignInType = {
  email: string;
  password: string;
};

type LogInResponseType = {
  message: string;
  token?: string;
  data?: CurrUserType;
};

type SignUpType = SignInType & {
  firstName: string;
  lastName: string;
};

type BlogResponseType = {
  title: string;
  description: string;
  author: string;
  _id: string;
  createdAt: string;
};

type IconActionType = {
  e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>;
  data: BlogResponseType;
};

type CurrUserType = {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
};

type CreateBlogReqType = {
  token: string;
  blog: CreateBlogType;
};

type CreateBlogType = {
  title: string;
  description: string;
  id: string;
};

//----------Store

type AuthToken = { token: string; pgNo: number };

type AuthTokenType = { token: string };

type BlogReqType = {
  token: string;
  id: string;
};

type TagStringType =
  | 'blogs_user'
  | 'blogs_user_main'
  | 'blogs_bulk'
  | 'blogs_bookmark'
  | 'blogs_bookmark_main';

type TagType = {
  type: TagStringType;
  id: string;
};

type ResType = {
  msg: string;
};

type EditBlogType = {
  token: string;
  id: string;
  blog: Partial<BlogType>;
};

type BlogGenResponseType = {
  msg: string;
};

type AllBlogsType = {
  blogs: BlogResponseType[];
  isNextPage: boolean;
  isPrevPage: boolean;
  bookmark: string[];
};

type FilteredBlogsType = {
  blogs: BlogResponseType[];
  filterStr: string;
};
/// Components

type NavItemsType = {
  title: string;
  to: string;
  include: boolean;
  key: string;
};

type AuthLayoutType = {
  children: ReactNode;
};

type AuthFieldTypes<T> = {
  title: string;
  subTitle: string;
  directTo: string;
  callFn: (arg: T) => void;
  fieldData: FieldTypeSi[];
  inputData: T;
  isError: boolean;
  errMsg: string | undefined;
};

type BlogItemType = {
  data: BlogResponseType;
  child: ReactNode;
};

type BlogFormType = {
  func: (arg: CreateBlogReqType) => void;
  data: BlogType;
};

type BlogType = {
  title: string;
  description: string;
};

type btnThemeType = 'primary' | 'danger' | 'success' | 'plain';

type defaultBtnType = 'button' | 'reset' | 'submit';

type BtnType = {
  btnVariant: btnThemeType;
  btnType?: defaultBtnType;
  text: string;
  extraClass: string;
  onClickHandler?: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
};

type InputFieldType = {
  type: string;
  id: string;
  extraClass?: string;
  name: string;
  value: string;
  placeholder?: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLInputElement>) => void;
};

type PaginationType = {
  isPrev: boolean;
  isNext: boolean;
  pgNo: number;
};

type SearchBarProps = {
  onSearch: (query: string) => void;
  str: string;
};

type BookmarkType = AuthTokenType & {
  blogId: string;
};
