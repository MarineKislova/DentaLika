<?php
// Включаем отображение ошибок, чтобы если что-то пойдет не так, мы видели причину
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] !== "POST") exit("Direct access not allowed");

$token = "8523522301:AAE0vXbeFzxikqieN6l3TCdo5uGsAgOxUcQ";
$chat_id = "-1003836134993";

if (!empty($_POST['honey'])) {
    http_response_code(400);
    exit("Spam detected");
}

$name = htmlspecialchars($_POST['name'] ?? 'Не указано');
$phone = htmlspecialchars($_POST['phone'] ?? 'Не указано');
$message = htmlspecialchars($_POST['message'] ?? 'Нет сообщения');

$date = date("d.m.Y H:i");
$text .= "<b>Имя:</b> $Сайтdentalika\n";
$text = "<b>🔔 Новая заявка с сайта</b>\n\n";
$text .= "<b>Имя:</b> $name\n";
$text .= "<b>Телефон:</b> $phone\n";
$text .= "<b>Сообщение:</b> $message\n\n";
// $text .= "<b>Дата:</b> $date";
$text .= "<i>Дата: $date</i>";

$url = "https://api.telegram.org/bot{$token}/sendMessage";
$data = [
    'chat_id' => $chat_id,
    'text' => $text,
    'parse_mode' => 'HTML'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data)); // Используем http_build_query
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//! КРИТИЧНО ДЛЯ MAMP, на сервере поменять на true:
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); 

$result = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

if ($result) {
    echo "Success: " . $result;
} else {
    http_response_code(500);
    echo "Error: " . $error;
}
?>