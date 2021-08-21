#!/bin/bash
# Shell猜数字游戏
# 规则
# 1 随机生成一个0~99的数字
# 2 输入错误 直接返回重新输入
# 3 猜测错误 提示大小 继续猜测（并返回剩余猜测次数）
# 4 连续猜错5次  退出（提示GAME OVER）
# 5 猜测正确（返回 you got it!）

count=0
chance=5

cat << EOF
======= Shell猜数字游戏 =======
# 数字区间[0~99]
# 你共有${chance}次机会！
# Ctrl+C可强制退出
EOF

rn=$((`head -20 /dev/urandom | cksum | cut -f1 -d " "` % 100))
# echo $rn

echoColor(){
  declare -A colors
  colors=(
    [black]=30    # 30m 黑色字
    [red]=31      # 31m 红色字
    [green]=32    # 32m 绿色字
    [yellow]=33   # 33m 黄色字
    [blue]=34     # 34m 蓝色字
    [purple]=35   # 35m 紫色字
    [skyblue]=36  # 36m 天蓝字
    [white]=37    # 37m 白色字
  )
  mes="$1"
  # 示例 echo -e "\033[31m 颜色字 \033[0m"
  echo -e "\033[${colors[$2]}m${mes}\033[0m"
}

chkValue(){
  gn="$1"
  # 非空判断
  if [ -z "$gn" ]; then
    echoColor "你还未输入呢" "skyblue"
    continue
  # 有效数字判断
  elif echo "$gn" | grep -q '[^0-9]'; then
    echoColor "请输入有效的数字" "red"
    continue
  # 范围判断
  elif (( $gn < 0 )) || (( $gn > 99 )); then
    echoColor "输入大小有误,请重新输入!" "red"
    continue
  fi
}

chkCount(){
  if (( $1 >= $chance )); then
    echoColor "${chance}次机会已用完, GAME OVER!" "blue"
    exit 0
  fi
}

guess(){
  while true; do
    read -p "请输入你猜测的数字[0~99]：" gn
    chkValue "$gn"
    break
  done

  if (( $gn > $rn )); then
    let "count++"
    echo '猜大了'
    echo "剩余猜测次数：$((chance-count))"
    chkCount $count
    guess
  elif (( $gn < $rn )); then
    let "count++"
    echo '猜小了'
    echo "剩余猜测次数：$((chance-count))"
    chkCount $count
    guess
  else
    echoColor "you got it!!!" "green"
  fi
}

guess
