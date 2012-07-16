<?php
/*

	*Copyright (c) 2012 Christoph Fritsch*

	## fileIO ##

	This is a very simple JSON File-Reader/-Writer

	* $myJsonReader = new FileIO( $file ); 
	* $myJsonReader -> printFile(); // you can read a file with json content 		
	* $myJsonReader -> writeJson( $json ) // you can write a json string to this file


*/
	class FileIO {	
			
		private $file;
		
		public function __construct( $file ) {
			$this->setFile($file);
		}

		public function printFile() {
			
			$fileContent = $this -> readFile();
			
			if ( $this -> validJsonStr( $fileContent ) || empty( $fileContent ) ){
				return print_r( $fileContent );
			} else { 
				return print_r( "Detect a bad JSON string in source file." );
			}
		}
		
		public function writeJson( $str ) {
			
			if ( $this -> validJsonStr( $str ) ){
				$this -> writeFile( $str );
			} else {
				return print_r( "Cannot write a bad JSON string to source file." );
			}
		}

		private function setFile( $file ) {
			$this -> file = $file;
		}
		
		private function readFile() {
			
			$fileContent = '';
			
			$handle = fopen( $this->file, "r" );
			while ( ($data = fgets($handle) ) !== false) {
				$fileContent .= $data;
			}
			fclose($handle);
			
			return $fileContent;
		}
		
		private function writeFile( $data ) {
				$handle = fopen( $this->file, "w" );
				fwrite( $handle, $data );
				fclose( $handle );
				
				return print_r( "Write data: ". $data );
		}

		private function validJsonStr( $jsonString ) {
			if ( json_decode( $jsonString )!=null ) {
				return $jsonString;
			} else {
				return false;
			}
		}
	}
?>