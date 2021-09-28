# cdn-assets

### 推荐使用格式：
https://cdn.jsdelivr.net/gh/用户名/储存库名@分支名(如master)/文件(目录)  
例：https://cdn.jsdelivr.net/gh/qinxs/cdn-assets@master/img/avatar.png  
简写（不推荐）：https://cdn.jsdelivr.net/gh/qinxs/cdn-assets/img/avatar.png


### 文件更新
~~由于存在缓存问题，所以要带上新的版本号（Tag 推送后，GitHub 自动 release）~~  
~~如：https://cdn.jsdelivr.net/gh/qinxs/cdn-assets@1.3.8/css/first.css~~  
直接用最近的 Commit ID（前8位）  
如：https://cdn.jsdelivr.net/gh/qinxs/cdn-assets@f415c64d/css/first.css  

详细说明： https://www.jsdelivr.com/features#gh


### 通过 Actions 清除缓存：
获取更改文件：https://github.com/marketplace/actions/git-changesets  
清除缓存测试：test.css [ [github][github]  [cdn][cdn]  [purge][purge] ]

[github]: ./test/cache.css
[cdn]: https://cdn.jsdelivr.net/gh/qinxs/cdn-assets@master/test/cache.css
[purge]: https://purge.jsdelivr.net/gh/qinxs/cdn-assets@master/test/cache.css