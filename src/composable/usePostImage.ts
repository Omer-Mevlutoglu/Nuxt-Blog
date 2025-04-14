export const usePostImage = () => {
  const getPostImage = (postId: number) => {
    const imageIndex = postId % 9;
    return `/images/trending/${imageIndex}.webp`;
  };

  return {
    getPostImage,
  };
};
