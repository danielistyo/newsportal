import { VImg } from 'vuetify/lib/components';

export default ({
  customClass,
  ...props
}: {
  customClass?: string;
  lazySrc: string;
}): JSX.Element => (
  <VImg {...props} class={customClass} src="https://cdn.vuetifyjs.com/images/cards/cooking.png" />
);
