const $ = (css, d = document) => d.querySelector(css);

const $sidebarMenu = $('#main-menu');

const $sidebarPC = $('.sidebar-collapse'),
  $sidebarMobile = $('.sidebar-mobile'),
  $showSettingBanner = $('.show-setting-banner');

const $goTop = $('#go-top');

// 可视区域的高度
var bodyHeight = document.documentElement.clientHeight;


class DropdownMenu {
  constructor(container, value) {
    this.container = container;
    this.menu = this.container.querySelector('.dropdown-menu');
    this.lable = this.container.querySelector('.lable');
    this.updateLable(value);
    this.lastValue = value;

    this.addEventListeners();
  }

  updateLable($valueItem) {
    if (typeof $valueItem === 'string') {
      $valueItem = this.menu.querySelector(`[value=${$valueItem}]`);
    }

    if ($valueItem) {
      this.lable.replaceChild($valueItem.firstElementChild.cloneNode(true), this.lable.firstElementChild);
    }
  }

  // 选项改变 
  onMenuValueChange(newValue, oldValue) {}

  addEventListeners() {
    this.container.addEventListener('click', () => {
      this.container.classList.toggle('active');
    });

    this.menu.addEventListener('mouseleave', () => {
      this.container.classList.remove('active');
    });

    this.menu.addEventListener('click', event => {
      // console.log(event.target);
      var $item = event.target.closest('li');
      var newValue = $item.getAttribute('value');
      if (newValue != this.lastValue) {
        this.updateLable($item);
        this.onMenuValueChange(newValue, this.lastValue);
        this.lastValue = newValue;
      }

      setTimeout(() => {
        this.container.classList.remove('active');
      }, 100);
    });
  }
}

function setGoTopStatus() {
  // 滚动条的滚动高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  if (scrollTop > bodyHeight * 0.8) {
    $goTop.style.visibility = 'visible';
  } else {
    $goTop.style.visibility = 'hidden';
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function getTotalOffsetTop(element) {
  var totalOffsetTop = 0;
  while (element.offsetParent) {
    totalOffsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return totalOffsetTop;
}

// img lazy loaded
const lozadObserver = lozad('.lozad', {
  rootMargin: '50% 0px',
});
lozadObserver.observe();

var fixedHeaderHeight = isMobile ? $('header').clientHeight : 0;

$sidebarMenu.addEventListener('click', event => {
  // console.log(event);
  var $anchorMenu = event.target.closest('a[role=anchor]');

  if ($anchorMenu) {
    // console.log($anchorMenu);
    var $anchorEle = $($anchorMenu.hash);

    if ($anchorEle) {
      event.preventDefault();
      document.body.classList.remove('sidebar-mobile-show');

      window.scroll({
        top: getTotalOffsetTop($anchorEle) - fixedHeaderHeight,
        behavior: 'smooth',
      });

      return;
    }
  }

  // 子菜单
  var $subMenu = event.target.closest('.has-sub');
  if ($subMenu) {
    event.preventDefault();
    $subMenu.classList.toggle('open');
  }
});

$sidebarPC.addEventListener('click', () => {
  config.sidebarCollapsed = !config.sidebarCollapsed;
  document.body.classList.toggle('sidebar-collapsed', config.sidebarCollapsed);
  localStorage.setItem('sidebarCollapsed', config.sidebarCollapsed);
});

$sidebarMobile.addEventListener('click', () => {
  document.body.classList.toggle('sidebar-mobile-show');
});

$showSettingBanner.addEventListener('click', () => {
  $('.setting-banner').classList.toggle('mobile-hidden');
});

const themeSwitcher = new DropdownMenu($('.theme-switcher'), config.themeColor);
themeSwitcher.onMenuValueChange = newValue => {
  // console.log(newValue);
  switchTheme(newValue);
}

// 滚动到顶部
setGoTopStatus();
window.addEventListener('scroll', setGoTopStatus);
$goTop.addEventListener('click', scrollToTop);
