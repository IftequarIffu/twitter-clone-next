import { Prisma } from "@prisma/client";

export type PostType = Prisma.PostGetPayload<{
  include: {
    likes: true;
    comments: true;
    bookmarks: true;
  };
}>;

export type CommentType = Prisma.CommentGetPayload<{
  include: {
    user: true;
    post: true;
  };
}>;

export type LikeType = Prisma.LikeGetPayload<{
  include: {
    user: true;
    post: true;
  };
}>;

export type FollowType = Prisma.FollowGetPayload<{
  include: {
    follower: true;
    following: true;
  };
}>;

export type UserType = Prisma.UserGetPayload<{
  include: {
    posts: true;
    comments: true;
    bookmarks: true;
    likes: true;
    follower: true;
    following: true;
  };
}>;
