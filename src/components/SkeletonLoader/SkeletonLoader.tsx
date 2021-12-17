export default ({
  height,
  width,
  borderRadius,
}: {
  width: string;
  height: string;
  borderRadius: number;
}): JSX.Element => (
    <div class="u-loading-gradient" style={{ height, width, borderRadius: `${borderRadius}px` }} />
);
