<?php
//Apnic是全球5个地区级的Internet注册机构（RIR）之一，负责亚太地区的以下一些事务
//http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest 

//china_ip_list/china_ip_list.txt
//1.0.1.0/24
$dataName = 'cn_ip_data';

function genMask($num)
{
    $str = str_pad(str_repeat('1', $num), 32, '0', STR_PAD_RIGHT);
    $strArr = str_split($str, 8);
    $maskArr = [];
    foreach ($strArr as $item) {
        $maskArr[] = bindec($item);
    }
    return implode('.', $maskArr);
}

function genJsRange($dataName)
{
    $fp = fopen('china_ip_list/china_ip_list.txt', 'r');
    $ipMap = [];
    while ($line = fgets($fp)) {
        $itemArr = explode('/', $line);
        $firstPart = substr($itemArr[0], 0, strpos($itemArr[0], '.'));
        $ipMap[$firstPart][] = [
            $itemArr[0],
            genMask($itemArr[1])
        ];
    }
    fclose($fp);
    file_put_contents($dataName, json_encode($ipMap));
}

if (!file_exists($dataName)) {
    genJsRange($dataName);
}
$jsRangeData = file_get_contents($dataName);

header('Content-type:application/x-javascript');
include "pac.tpl.js";
