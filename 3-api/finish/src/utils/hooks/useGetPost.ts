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
  const post = useQuery(['post', postId], () => getPost(postId), {
    staleTime: 0,
    retryOnMount: false,
    retry: false,
    retryDelay: 0,
  });
  return post;
};
