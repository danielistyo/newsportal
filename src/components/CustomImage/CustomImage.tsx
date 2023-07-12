import { VImg } from 'vuetify/components';

export default ({
  customClass,
  ...props
}: {
  customClass?: string;
  src: string;
  onClick?: () => void;
}): JSX.Element => (
  <VImg
    {...props}
    class={customClass}
    lazySrc="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
  />
);
