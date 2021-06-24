import { useGetPost } from '../../utils/hooks/useGetPost';

type PostProps = {
  readonly id: number;
};

export const Post = ({ id }: PostProps) => {
  const { isLoading, isSuccess, isError, data, error } = useGetPost(id);
  return (
    <>
      {isLoading ? <p>Loading...</p> : null}
      {isError ? <p>Something went wrong</p> : null}
      {isSuccess ? <p>Success</p> : null}
      <h2>{data?.title}</h2>
      <p>{data?.body}</p>
    </>
  );
};
