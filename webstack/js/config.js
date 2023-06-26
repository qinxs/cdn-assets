// 关键js
// 提前执行 防止重复渲染闪烁

const config = {
  themeColor: 'light',
  sidebarCollapsed: false, // 侧边栏折叠状态
  search: {
    searchCards: true,
    hotKeyword: true,
    engine: '必应',
    iconPosition: '0px -40px',
  }
}

for (const key of Object.keys(config)) {
  var value = localStorage.getItem(key);
  if (value) {
    try {
      var jsonValue = JSON.parse(value);
      if (typeof jsonValue === 'object') {
        Object.assign(config[key], jsonValue);
      } else {
        config[key] = jsonValue;
      }
    } catch {
      config[key] = value;
    }
  }
}

// 与@media screen中一致
var isMobile = window.innerWidth <= 500;

!isMobile && document.body.classList.toggle('sidebar-collapsed', config.sidebarCollapsed);

switchTheme(config.themeColor);

function switchTheme(name) {
  localStorage.setItem('themeColor', name);
  
  if (name == 'auto' && window.matchMedia 
    && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    name = 'dark';
  }

  document.body.classList.toggle('dark', name == 'dark');
}