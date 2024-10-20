javascript:(() => {
  const createYoutubeStyle = () => {
    const style = document.createElement('style');
    style.id = 'youtube-style';
    style.innerHTML = `
      ytd-rich-item-renderer[rendered-from-rich-grid] {
        width: calc(100% / 5 - 16px) !important;
      }
      
      ytd-rich-item-renderer[rendered-from-rich-grid][is-in-first-column] {
        margin: 5px !important;
      }
      
      ytd-rich-item-renderer {
        margin: 5px !important;
      }`;
    return style;
  };
  
  const existingStyle = document.getElementById('youtube-style');
  if (!existingStyle) {
    const YTstyle = createYoutubeStyle();
    document.body.appendChild(YTstyle);
  } else {
    existingStyle.remove();
  }
})();
