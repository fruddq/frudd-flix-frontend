export const VideoPlayer: React.FunctionComponent<{ readonly src: string }> = ({ src }) =>
(
  <iframe
    width="560"
    height="315"
    src={src}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen>
  </iframe>
)
