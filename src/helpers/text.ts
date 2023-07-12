/* eslint-disable import/prefer-default-export */
export const sliceText = (text: string, max?: number) => {
  const MAX_SUBTITLE = max || 100;
  return text && text.length > MAX_SUBTITLE ? `${text.slice(0, MAX_SUBTITLE)}...` : text;
};
