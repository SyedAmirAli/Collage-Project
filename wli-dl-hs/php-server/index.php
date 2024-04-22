<?php 

// echo "Local IP => " . gethostbyname(trim(exec("ip route | grep default | cut -d ' ' -f 3")));

header('Content-Type: application/json');
$timestamps = new DateTime();
$iso_string = $timestamps->format('c');

$method = $_SERVER['REQUEST_METHOD'];
$is_post = $method == 'POST';
$is_get = $method == 'GET';
$signature = hash('sha256', hexdec(uniqid("syed-amir-ali", true) . microtime(true)));

if($is_get){
    http_response_code(200);
    echo file_get_contents("database.json");
    exit;
}

if($is_post){
    $headers = getallheaders();
    $signature = (isset($headers['X-Signature']) ? $headers['X-Signature'] : null) == '2a797c96d507542349e0d6f8eedaef49ef89b1a144dcfd6105342ad460119ca0';
    $auth_key = (isset($headers['Auth-Key']) ? $headers['Auth-Key'] : null) == 'syed__amir__ali'; 

    if(!$signature && !$auth_key){
        http_response_code(401);
        echo json_encode(array(
            'status'=> 401,
            'type'=> 'INCOMPLETE_REQUEST',
            'message'=> "Requested header's `X-SIGNATURE` & `AUTH-KEY` mismatch!",
            'signatureExample'=> $signature,
        ), JSON_PRETTY_PRINT);

        exit;
    }

    if(!$signature){
        http_response_code(401);
        echo json_encode(array(
            'status'=> 401,
            'type'=> 'INCOMPLETE_REQUEST',
            'message'=> "Requested header's `X-SIGNATURE` mismatch!",
            'signatureExample'=> $signature,
        ), JSON_PRETTY_PRINT);

        exit;
    }

    if(!$auth_key){
        http_response_code(401);
        echo json_encode(array(
            'status'=> 401,
            'type'=> 'INCOMPLETE_REQUEST',
            'message'=> "Requested header's `AUTH-KEY` mismatch!",
            'signatureExample'=> $signature,
        ), JSON_PRETTY_PRINT);

        exit;
    }

    http_response_code(200);
    $response = file_get_contents('php://input');
    $res_data =  json_decode($response, true);

    $new_data = array(
        'author'=> isset($res_data['author']) ? $res_data['author'] : null,
        'email'=> isset($res_data['email']) ? $res_data['email'] : null,
        'localIp'=> isset($res_data['localIp']) ? $res_data['localIp'] : null,
        'ipV4'=> isset($res_data['ipV4']) ? $res_data['ipV4'] : null,
        'port'=> isset($res_data['port']) ? $res_data['port'] : null,
        'apiPrefix'=> isset($res_data['apiPrefix']) ? $res_data['apiPrefix'] : null,
        'apiUrl'=> isset($res_data['apiUrl']) ? $res_data['apiUrl'] : null, 
        'endpoints'=> isset($res_data['endpoints']) ? json_decode($res_data['endpoints']) : null, 
        'socketListeners'=> isset($res_data['socketListeners']) ? json_decode($res_data['socketListeners']) : null, 
        'authKey'=> isset($res_data['authKey']) ? $res_data['authKey'] : null, 
        'xSignature'=> isset($res_data['xSignature']) ? $res_data['xSignature'] : null, 
        'createdAt'=> $iso_string,
        'updatedAt'=> $iso_string,
    );

    $put_file = file_put_contents('database.json', json_encode($new_data, JSON_PRETTY_PRINT));

    if($put_file){
        $new_data['message'] = 'Credential Created Successfully!';
        echo json_encode($new_data, JSON_PRETTY_PRINT);

        exit;
    } 

    http_response_code(400);
    echo json_encode(array(
        'status'=> 500,
        'type'=> 'SERVER_INTERNAL_ERRORS',
        'message'=> "There is an serious error occurred!",
        'signatureExample'=> $signature,
    ), JSON_PRETTY_PRINT);

    exit; 

} 

http_response_code(400);
echo json_encode(array(
    'status'=> 400,
    'type'=> 'BAD_REQUEST',
    'message'=> "The request method aren't allowed. Only `POST` Request allowed!",
    'signatureExample'=> $signature,
), JSON_PRETTY_PRINT);

exit;
 