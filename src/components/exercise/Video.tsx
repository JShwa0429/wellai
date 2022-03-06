const Video: React.FunctionComponent<{ url: string }> = ({ url }) => {
  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/${url}?autoplay=1&mute=1&modestbranding=1&playlist=${url}&loop=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    </>
  );
};

export default Video;
