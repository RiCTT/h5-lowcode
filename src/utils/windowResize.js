export const setDomFontSize = () => {
  let width = document.documentElement.clientWidth || document.body.clientWidth;
  let fontsize = (width >= 750 ? 750 : width) / 16 + 'px';
  (document.getElementsByTagName('html')[0].style)['font-size'] = fontsize;
}

window.addEventListener('resize', setDomFontSize)