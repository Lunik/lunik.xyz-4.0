<?
	$file = "../json/".$_GET['file'];
	$data = $_GET['data'];

	switch($_GET['do']){
		case 'save':
			$fp = fopen($file, 'a+');
			fwrite($fp, $data);
			fwrite($fp, "\n");
			fclose($fp);
			break;
		case 'read':
			$resultData = array();
			$fp = fopen($file, 'r');
			$readData = fread($fp, filesize($file));
			fclose($fp);
			$readData = explode(PHP_EOL, $readData);
			for($i = 0; $i < count($readData); $i++){
				$subs = explode(';', $readData[$i]);
				$resultData[$subs[0]] = $subs[1];
			}
			echo json_encode($resultData);

			break;
		case 'get':
			$resultData = array();
			$fp = fopen($file, 'r');
			$readData = fread($fp, filesize($file));
			fclose($fp);
			$readData = explode(PHP_EOL, $readData);
			for($i = 0; $i < count($readData); $i++){
				$subs = explode(';', $readData[$i]);
				if($data == $subs[0]){
					$resultData[$subs[0]] = $subs[1];
					break;
				}
			}
			echo json_encode($resultData);
			break;
	}

?>