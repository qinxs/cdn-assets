# -*- coding: utf-8 -*-
# @Author  : qinxs
# @Time    : 2021-8-18 18:55
# @Test    : python clean-jsDelivr-cache.py qinxs/cdn-assets test-cache/test.css

import sys
import json
import requests


def clean_cache():
    s = requests.session()
    url_purge = 'https://purge.jsdelivr.net/gh/' + sys.argv[1] + '@master/'
    url_cdn = 'https://cdn.jsdelivr.net/gh/' + sys.argv[1] + '@master/'
    print("前缀地址：", url_purge)

    try:
        for file in sys.argv[2:]:
            while True:
                res = s.get(url_purge + file).json()
                # print(res)
                if res["status"] == "finished":
                    print("成功：", url_cdn + file)
                    break
                else:
                    print("失败：", url_purge + file)
    except Exception as e:
        print("失败：", e)

if __name__ == "__main__":
    # print('参数个数为:', len(sys.argv), '个参数。')
    # print('参数列表:', str(sys.argv))
    if len(sys.argv) < 3:
        print("提示：", "没有要处理的文件")
        exit()
    clean_cache()
