type AppProps = {
  accessible?: boolean;
};

export const Image = ({ accessible }: AppProps) => {
  return <img src="/" alt={accessible ? 'alt' : undefined} />;
};
