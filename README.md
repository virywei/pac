**开发背景**

IE 11开始，使用自动配置pac脚本已不支持file://协议，必须使用http协议。

因此本项目是为了在本地或者私有服务器上快速部署线上pac脚本而开发。

pac代理地址：http://部署域名/pac.php

**环境依赖：**

1、php-cli

2、国内地址库 https://github.com/17mon/china_ip_list

**启动和使用：**

1、window cmd环境，进入项目目录：php -S 127.0.0.1:8555

2、「Internet选项 -> 连接 -> 局域网设置 -> 使用自动配置脚本」
  http://127.0.0.1:8555/pac.php

