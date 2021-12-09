/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

// eslint-disable-next-line import/prefer-default-export
export async function loadFonts(): Promise<void> {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */ 'webfontloader');

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  });
}
