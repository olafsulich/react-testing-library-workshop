import { useCreatePost } from '../../utils/hooks/useCreatePost';

export const CreatePost = () => {
  const { isLoading, isSuccess, mutate } = useCreatePost();

  const handleCreatePost = () => {
    mutate({
      userId: 1,
      id: 1,
      title: 'New post',
      body: 'description',
    });
  };

  return (
    <>
      {isLoading ? <p>Loading...</p> : null}
      {isSuccess ? <p>Success</p> : null}
      <button onClick={handleCreatePost}>Add post</button>
    </>
  );
};
