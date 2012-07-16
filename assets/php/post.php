<?php
	require_once( "lib/fileio.inc.php" );
	
	$file = "../data/todo.json";

	$data = file_get_contents( "php://input" );

	if( !empty( $data ) ) {
		$myIO = new FileIO( $file );
		$myIO -> writeJson( $data );
	}
?>