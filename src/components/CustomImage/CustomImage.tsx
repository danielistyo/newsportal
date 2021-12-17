import { VImg } from 'vuetify/lib/components';

export default ({ customClass, ...props }: { customClass?: string; src: string }): JSX.Element => (
  <VImg
    {...props}
    class={customClass}
    lazySrc="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
  />
);
