<?php

//参数type表示：
// 1: 京东
// 2: 天猫
// 3：美丽说
// 4：一号店
// 5：淘宝

header('Content-type:text/html;charset=utf-8'); 
require_once 'phpanalysis.class.php';
set_time_limit(0);


$id=$_GET["id"];
$type=$_GET["type"];

include('conn.php');



switch ($type) {
    case 1:
        $sql_price = "SELECT Price FROM jd where productid = $id";
        $sql_comment = "SELECT * FROM jd_comment where productid = $id";
        $sql_time = "SELECT * FROM jd_comment where productid = $id";
        break;
     case 2:
        $sql_price = "SELECT Price,SaleNum FROM tm where productid = $id";
        $sql_comment = "SELECT * FROM tm_comment where productid = $id";
        $sql_time = "SELECT * FROM tm_comment where productid = $id";
        break;
     case 3:
        $sql_price = "SELECT Price,SaleNum FROM meilishuo where productid = $id";
        $sql_comment = "SELECT * FROM meilishuo_comment where productid = $id";
        $sql_time = "SELECT * FROM meilishuo_comment where productid = $id";
        break;
     case 4:
        $sql_price = "SELECT Price,SaleNum FROM yhd where productid = $id";
        $sql_comment = "SELECT * FROM yhd_comment where productid = $id";
        $sql_time = "SELECT * FROM yhd_comment where productid = $id";
        break;
     case 5:
        $sql_price = "SELECT Price,SaleNum FROM tb where productid = $id";
        $sql_comment = "SELECT * FROM tb_comment where productid = $id";
        $sql_time = "SELECT * FROM tb_comment where productid = $id";
        break;
    default:
        break;
}

$conn->query("SET NAMES UTF8");


$price_result = $conn->query($sql_price);
$price_comment = $conn->query($sql_comment);
$time_result = $conn->query($sql_time);

$price_row = $price_result -> fetch_assoc();
$comment_row = $price_comment -> fetch_assoc();
$time_row = $time_result -> fetch_assoc();

$data = array();

    $data['Price'] = $price_row['Price'];
    $data['SellNumber'] = $price_row['SaleNum'];
    $data['time'] = $price_row['time'];

$i = 0;
while ($comment_row) {
    $data['comment'][$i]=$comment_row['comment'];
    $string = $string . $comment_row['comment'];
    $comment_row = $price_comment -> fetch_assoc();
    $i++;
}
$j = 0;
while ($time_row) {
    $data['time'][$j]=$time_row['time'];

    $time_row = $time_result -> fetch_assoc();
    $j++;
}
function print_memory($rc, &$infostr)
{
    global $ntime;
    $cutime = microtime(true);
    $etime = sprintf('%0.4f', $cutime - $ntime);
    $m = sprintf('%0.2f', memory_get_usage()/1024/1024);
    $infostr .= "{$rc}: &nbsp;{$m} MB 用时：{$etime} 秒<br />\n";
    $ntime = $cutime;
}
$memory_info = '';
print_memory('没任何操作', $memory_info);

$str = $string;

$loadtime = $endtime1  = $endtime2 = $slen = 0;

$do_fork = $do_unit = true;
$do_multi = $do_prop = $pri_dict = false;

if($str != '')
{
    //岐义处理
    $do_fork = empty($_POST['do_fork']) ? false : true;
    //新词识别
    $do_unit = empty($_POST['do_unit']) ? false : true;
    //多元切分
    $do_multi = empty($_POST['do_multi']) ? false : true;
    //词性标注
    $do_prop = empty($_POST['do_prop']) ? false : true;
    //是否预载全部词条
    $pri_dict = empty($_POST['pri_dict']) ? false : true;
    
    $tall = microtime(true);
    
    //初始化类
    PhpAnalysis::$loadInit = false;
    $pa = new PhpAnalysis('utf-8', 'utf-8', $pri_dict);
    print_memory('初始化对象', $memory_info);
    
    //载入词典
    $pa->LoadDict();
    print_memory('载入基本词典', $memory_info);    
        
    //执行分词
    $pa->SetSource($str);
    $pa->differMax = $do_multi;
    $pa->unitWord = $do_unit;
    
    $pa->StartAnalysis( $do_fork );
    print_memory('执行分词', $memory_info);
    
    $okresult = $pa->GetFinallyResult(' ', $do_prop);
    $array = $pa->getfinallyindex();

    $data['word'] = $okresult;
    $data['wordCount'] = $array;

    print_memory('输出分词结果', $memory_info);
    
    $pa_foundWordStr = $pa->foundWordStr;
    
    $t2 = microtime(true);
    $endtime = sprintf('%0.4f', $t2 - $t1);
    
    $slen = strlen($str);
    $slen = sprintf('%0.2f', $slen/1024);
    
    $pa = '';
    
}

$jos = json_encode($data);
echo $jos;

?>