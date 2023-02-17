export const VideoPlayer: React.FunctionComponent<{ readonly src: string }> = ({ src }) =>
(
  <iframe
    width="90%"
    height="50%"
    src={src}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen>
  </iframe>
)
