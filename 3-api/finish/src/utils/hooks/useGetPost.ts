import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import type { Post } from '../types';

type PostId = number;

const getPost = async (postId: PostId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const data: unknown = await res.json();
  return data as Post;
};

export const useGetPost = (postId: PostId) => {
  const post = useQuery({ queryKey: ['post', postId], queryFn: () => getPost(postId) });
  return post;
};
