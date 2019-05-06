/**
//禁用代理缓存
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\CurrentVersion\Internet Settings]"EnableAutoProxyResultCache"=dword:00000000"


（IE 11以上无效）在 Windows 系统中，通过「Internet选项 -> 连接 -> 局域网设置 -> 使用自动配置脚本」可以找到配置处，下放的地址栏填写 PAC 文件的 URI，
这个 URI 可以是本地资源路径(file:///)，也可以是网络资源路径(http://)。

Chrome 中可以在「chrome://settings/ -> 显示高级设置 -> 更改代理服务器设置」中找到 PAC 填写地址
*/

var cnIpRange = <?php echo $jsRangeData; ?>;

function FindProxyForURL(url, host) {
  // return "PROXY 222.20.74.89:8800; SOCKS 222.20.74.89:8899; DIRECT";
  var proxyReturn = 'PROXY 127.0.0.1:8580; DIRECT';
  var proxyForceReturn = 'PROXY 127.0.0.1:8580;';

  //域名==
  if (dnsDomainIs(host, "google.com") || 
    dnsDomainIs(host, "www.google.com")) {
    return proxyReturn;
  }

  //正则匹配
  /*if (shExpMatch(host, "google.com") ||
    shExpMatch(url, "http://abcdomain.com/folder/*")) {
    return proxyReturn; 
  }*/

  //网段匹配  myIpAddress() 获取ip
  var isCn = false;
  var dnsHost = dnsResolve(host);
  var firstPart = dnsHost.substring(0, dnsHost.indexOf('.'));
  if (firstPart == '10' || firstPart == '127' || firstPart == '172' || firstPart == '192') {
    return "DIRECT";
  }
  if (cnIpRange[firstPart]) {
      for (var i=0, item; item=cnIpRange[firstPart][i++];) {
          if (isInNet(dnsHost, item[0], item[1])) {
              isCn = true;
              break;
          }
      }
  }

  if (!isCn) {
    return proxyForceReturn;
  }
  /*if (isInNet(dnsResolve(host), "x.xx.0.0", "x.xx.0.0")) {
    return proxyForceReturn;
  }*/

  // 主机是否可以访问
  if (!isResolvable(host)) {
    return proxyReturn;
  }
  

  //是否单词域名，诸如http://barret/，http://server-name/ 这样的主机名 isPlainHostName(host)
  //返回是几级域名，dnsDomainLevels(host)。比如dnsDomainLevels(http://barretlee.com) 返回的结果就是 1
  //周一到周五 weekdayRange("MON", "FRI")
  //一月到五月 dateRange("JAN", "MAR")
  //八点到十八点 timeRange(8, 18)
  //调式 alert(resolved_host)

  
  return "DIRECT";
}