javascript:(() => {
  class Tooltip {
    constructor() {
      this.tooltipStyle = this.createTooltipStyle();
      this.tooltipModel = this.createTooltipModel();
    }

    createTooltipStyle() {
      const style = document.createElement('style');
      style.id = 'tooltip-style';
      style.innerHTML = `
        .tooltip-model {
          opacity: 0;
          transition: opacity .5s;
          visibility: hidden;
          position: relative;
        }
        .tooltip-model span {
          width: 100px;
          background-color: #555;
          color: #fff;
          text-align: center;
          padding: 5px 0;
          border-radius: 6px;
          z-index: 99999999;
          font-size: 13px;
        }
        .tooltip-model span:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #555 transparent transparent transparent;
        }`;
      return style;
    }

    createTooltipModel() {
      const model = document.createElement('div');
      model.classList.add('tooltip-model');
      return model;
    }

    show(text, targetName, position = [null, -30]) {
      document.body.appendChild(this.tooltipStyle);
      if (targetName) {
        const target = typeof targetName === 'string' ? document.getElementById(targetName.replace('#', '')) : targetName;
        position[0] = position[0] ?? `calc(${(target.offsetWidth * 0.5)}px - 50px)`;
        this.tooltipModel.innerHTML = `<span style="position: absolute; left: ${position[0]}; top: ${position[1]}px;">${text}</span>`;
        target.insertAdjacentElement('afterbegin', this.tooltipModel);
      } else {
        this.tooltipModel.innerHTML = `<span style="position: fixed; left: 1%; top: 1%;">${text}</span>`;
        document.body.appendChild(this.tooltipModel);
      }
      setTimeout(() => {
        this.tooltipModel.style.visibility = 'visible';
        this.tooltipModel.style.opacity = 1;
      }, 1);
    }

    hide() {
      this.tooltipModel.style.opacity = 0;
      setTimeout(() => {
        this.tooltipModel.style.visibility = 'hidden';
        this.tooltipStyle.remove();
        this.tooltipModel.remove();
      }, 500);
    }
  }

  const tooltip = new Tooltip();

  const copyText = async (copyText, isTooltip = true, callback = null) => {
    const copyToClipboard = (text) => {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      const success = document.execCommand('copy');
      document.body.removeChild(el);
      return success;
    };

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(copyText);
        if (isTooltip) {
          tooltip.show('複製成功');
          setTimeout(() => tooltip.hide(), 1000);
        }
        if (typeof callback === 'function') callback();
      } catch (err) {
        if (copyToClipboard(copyText) && isTooltip) {
          tooltip.show('複製成功');
          setTimeout(() => tooltip.hide(), 1000);
        } else if (isTooltip) {
          tooltip.show('複製失敗');
          setTimeout(() => tooltip.hide(), 1000);
        }
    }
    } else {
      const success = copyToClipboard(copyText);
      if (isTooltip) {
        tooltip.show(success ? '複製成功' : '複製失敗');
        setTimeout(() => tooltip.hide(), 1000);
      }
      if (typeof callback === 'function') callback();
    }
  };

  const addClickListener = (selector, handler) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => element.addEventListener('click', handler));
  };

  const handleUserPage = () => {
    const author = document.querySelector('h1').innerText;
    const id = location.href.split('/');
    copyText(`${author} (${id[4]})`);
  };

  const handleSeriesPage = () => {
    const elementList = {
      cover: '.sc-vmsckl-2',
      series: '.sc-vk2fvc-2',
      description: '.sc-eyxzap-1'
    };
    for (const [key, el] of Object.entries(elementList)) {
      if (key === 'cover') {
        const coverElement = document.querySelector(el);
        coverElement.style.cursor = 'pointer';
        coverElement.addEventListener('click', () => {
          const a = document.createElement("a");
          a.href = coverElement.src;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      } else {
        addClickListener(el, function () {
          copyText(this.innerText);
        });
      }
    }
    tooltip.show('準備就緒');
    setTimeout(() => tooltip.hide(), 1000);
  };

  const handleDefaultPage = () => {
    const elementList = {
      author: '',
      series: '.sc-1u8nu73-15',
      title: '.iLOtJW',
      description: '.gaIENr',
      content: 'main',
      pages: '.sc-xhhh7v-1',
      cover: '.sc-1u8nu73-17',
      datetime: '.sc-5981ly-0'
    };

    for (const [key, el] of Object.entries(elementList)) {
      switch (key) {
        case 'author':
          if (document.querySelectorAll('[data-gtm-value]').length > 0) {
            setTimeout(() => {
              const author_name = document.querySelectorAll('[data-gtm-value]')[1].innerText;
              const author_id = document.querySelectorAll('[data-gtm-value]')[1].getAttribute("data-gtm-value");
              copyText(`${author_name} (${author_id})`, false, () => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
              });
            }, 100);
          }
          break;
        case 'content':
          const mains = document.querySelectorAll(el);
          mains.forEach((main, index) => {
            if (index > 0) {
              const contentName = `.${main.children[0].classList[0]}`;
              document.querySelector(contentName).addEventListener('click', () => {
                setTimeout(() => {
                  const contentModel = document.createElement('div');
                  contentModel.classList.add('content-model');
                  contentModel.innerHTML = Array.from(document.querySelector(contentName).children)
                    .map(child => (child.localName === 'p' ? child.innerHTML + '<p></p>' : child.localName === 'h2' ? child.innerHTML + '<p></p><br/>' : ''))
                    .join('');
                  document.body.appendChild(contentModel);
                  copyText(contentModel.innerText);
                  contentModel.remove();
                }, 100);
              });
            }
          });
          break;
        case 'pages':
          const pages = document.querySelectorAll(el);
          tooltip.show(pages.length > 0 ? '有分頁' : '無分頁');
          setTimeout(() => tooltip.hide(), 500);
          break;
        case 'cover':
          const coverElement = document.querySelector(el);
          coverElement.addEventListener('click', () => {
            if (document.querySelectorAll('[data-gtm-value]').length > 0) {
              const author_name = document.querySelectorAll('[data-gtm-value]')[1].innerText;
              const author_id = document.querySelectorAll('[data-gtm-value]')[1].getAttribute("data-gtm-value");
              copyText(`${author_name} (${author_id})`);
            }
          });
          break;
        case 'datetime':
          document.querySelector(el).addEventListener('click', () => {
            const datetime = document.querySelector(el).innerText;
            copyText(datetime.replaceAll('年', '/').replaceAll('月', '/').replaceAll('日', '').split(' ')[0]);
          });
          break;
        default:
          addClickListener(el, function () {
            copyText(this.innerText);
          });
      }
    }
  };

  if (location.href.includes('users')) {
    handleUserPage();
  } else if (location.href.includes('series')) {
    handleSeriesPage();
  } else {
    handleDefaultPage();
  }
})();
