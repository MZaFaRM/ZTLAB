import DOMParser from 'react-native-html-parser';

export const getName = htmlContent => {
  const parser = new DOMParser.DOMParser();  
  const parsedHtml = parser.parseFromString(htmlContent, 'text/html');
  
  const iconUserTag = parsedHtml.getElementsByClassName('icon-user')[0];
  if (iconUserTag && iconUserTag.parentNode) {
    const nameTag = iconUserTag.parentNode.querySelector('.text');
    if (nameTag) {
      return nameTag.textContent.trim();
    }
  }
  return false;
};
