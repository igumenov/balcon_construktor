<?php
$to = 'boba-55@mail.ru';
$email =  'webmaster@example.com';
//if ( isset( $_POST['steps_form'] ) ) {


    
    $step_1_range_1	= $_POST['step_1_range_1'];
    $step_1_range_2	= $_POST['step_1_range_2'];

    $step_2	= $_POST['step_2'];
    $step_3	= $_POST['step_3'];
    $step_3_res= '';
    foreach ($_POST['step_3'] as $val) {
        $step_3_res .= $val.", ";
    }
    var_dump($step_3_res);

    $step_4	= $_POST['step_4'];
    $step_5	= $_POST['step_5'];
    $step_6	= $_POST['step_6'];

    $name	= $_POST['name'];
    $tel	= $_POST['tel'];
    $call_time	= $_POST['call_time'];


    if ( !empty( $_FILES['file']['tmp_name'] ) and $_FILES['file']['error'] == 0 ) {
        $filepath = $_FILES['file']['tmp_name'];
        $filename = $_FILES['file']['name'];
      } else {
        $filepath = '';
        $filename = '';
    }
	$body = '<p><b>Площадь балкона: </b>'.$step_1_range_1.'м<sup>2</sup></p>';
	$body .= '<p><b>Бюджет: </b>'.$step_1_range_2.'руб.</p>';
	$body .= '<p><b>Какое остекление: </b>'.$step_2.'</p>';
    $body .= '<p><b>Дополнительные работы к остеклению: </b>'.$step_3_res.'</p>';
	$body .= '<p><b>Отделка стен: </b>'.$step_4.'</p>';
	$body .= '<p><b>Отделка пола: </b>'.$step_5.'</p>';
	$body .= '<p><b>Подарок к заказу: </b>'.$step_6.'</p>';
	$body .= '<hr/>';
	$body .= '<p><b>Имя: </b>'.$name.'</p>';
	$body .= '<p><b>Телефон: </b>'.$tel.'</p>';
	$body .= '<p><b>Время звонка:</b>'.$call_time.'</p>';
	send_mail($to, $body, $email, $filepath, $filename);
//}



// Вспомогательная функция для отправки почтового сообщения с вложением
function send_mail($to, $body, $email, $filepath, $filename)
{
  $subject = 'Заявка с сайта '.$_SERVER['HTTP_REFERER'];
  $boundary = "--".md5(uniqid(time())); // генерируем разделитель
  $headers = "From: ЕВРОРЕМ БАЛКОН <".$email.">\r\n";   
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
  $multipart = "--".$boundary."\r\n";
  $multipart .= "Content-type: text/html; charset=\"utf-8\"\r\n";
  $multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

  $body = $body."\r\n\r\n";
 
  $multipart .= $body;
 
  $file = '';
  if ( !empty( $filepath ) ) {
    $fp = fopen($filepath, "r");
    if ( $fp ) {
      $content = fread($fp, filesize($filepath));
      fclose($fp);
      $file .= "--".$boundary."\r\n";
      $file .= "Content-Type: application/octet-stream\r\n";
      $file .= "Content-Transfer-Encoding: base64\r\n";
      $file .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
      $file .= chunk_split(base64_encode($content))."\r\n";
    }
  }
  $multipart .= $file."--".$boundary."--\r\n";
  mail($to, $subject, $multipart, $headers);
}
?>