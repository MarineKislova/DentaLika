<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] !== "POST") exit("Direct access not allowed");

$token = "8523522301:AAE0vXbeFzxikqieN6l3TCdo5uGsAgOxUcQ";
$chat_id = "-1003836134993";

// Проверка на спам (honey field)
if (!empty($_POST['honey'])) {
    http_response_code(400);
    exit("Spam detected");
}

// Общие поля для обеих форм
$name = htmlspecialchars($_POST['name'] ?? 'Не указано');
$phone = htmlspecialchars($_POST['phone'] ?? 'Не указано');
$message = htmlspecialchars($_POST['message'] ?? 'Нет сообщения');
$date_now = date("d.m.Y H:i");

// Определяем, какая форма пришла
// Если есть поле 'service', значит это Форма 2 (Запись на прием)
if (isset($_POST['service'])) {
    $title = "📅 ЗАПИСЬ НА ПРИЕМ (Форма 2)";
    $service = htmlspecialchars($_POST['service'] ?? '-');
    $doctor = htmlspecialchars($_POST['doctor'] ?? 'Не выбран');
    $pref_date = htmlspecialchars($_POST['date'] ?? '-');
    $pref_time = htmlspecialchars($_POST['time'] ?? '-');

    $text = "<b>$title</b>\n\n";
    $text .= "<b>👤 Имя:</b> $name\n";
    $text .= "<b>📞 Телефон:</b> $phone\n";
    $text .= "<b>🦷 Услуга:</b> $service\n";
    $text .= "<b>👨‍⚕️ Врач:</b> $doctor\n";
    $text .= "<b>🗓 Дата:</b> $pref_date\n";
    $text .= "<b>⏰ Время:</b> $pref_time\n";
    $text .= "<b>📝 Сообщение:</b> $message\n\n";
} else {
    // Иначе это Форма 1 (Консультация)
    $title = "🔔 ЗАЯВКА НА КОНСУЛЬТАЦИЮ (Форма 1)";
    $text = "<b>$title</b>\n\n";
    $text .= "<b>👤 Имя:</b> $name\n";
    $text .= "<b>📞 Телефон:</b> $phone\n";
    $text .= "<b>📝 Сообщение:</b> $message\n\n";
}

$text .= "<i>Отправлено: $date_now</i>";

// Отправка в Telegram
$url = "https://api.telegram.org/bot{$token}/sendMessage";
$data = [
    'chat_id' => $chat_id,
    'text' => $text,
    'parse_mode' => 'HTML'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); 

$result = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

if ($result) {
    echo "Success";
} else {
    http_response_code(500);
    echo "Error: " . $error;
}
?>