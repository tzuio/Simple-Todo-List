<?php
	require_once( "lib/fileio.inc.php" );
	
	$file = "../data/todo.json";
	
	$myIO = new FileIO( $file );
	
	$myIO -> printFile();
?>