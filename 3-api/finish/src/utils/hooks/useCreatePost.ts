import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import type { Post } from '../types';

const createPost = async (newPost: Post) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-type': 'application/json;',
    },
  });
  const data: unknown = await res.json();
  return data as Post;
};

export const useCreatePost = () => {
  const mutation = useMutation((newPost: Post) => createPost(newPost), {
    onSuccess: () => console.log('Success!'),
  });
  return mutation;
};
