/*  

**Copyright (c) 2012 Christoph Fritsch**

##TodoController##

This is a very simple Todo-TaskManager

* made with AngularJS, PHP and Twitter Bootstrap CSS

##Example of necessary JSON schema##

[{name:"milk", status:"done"},{name:"butter", status:"open"}]

*/

function TodoController( $scope, $http ) {

    $scope.getUrl = "/assets/php/get.php";
    $scope.postUrl = "/assets/php/post.php";
    $scope.taskList = [];
    $scope.errorStyleClass = null;


    // Make a form validation.
    $scope.formValidation = function() {

        // Stop empty submits or go and set a new task
        if ( typeof $scope.taskName != "undefined" && $scope.taskName .length != 0 ) {

          $scope.setErrorStyle( null );
          $scope.addTask();
        
        } else {

          // set an error class
          $scope.setErrorStyle( "error" );
        
        }

    };

    // Get a sum of all open tasks.
    $scope.getSumOpenTasks = function() {

        var z = 0;
        var len = $scope.taskList.length;
        
        for ( var i = 0; i<len; i++ ) {
            if ( $scope.taskList[i].status === "open" ) {
                z++;
            } 
        }
        
        return z;

    };

    // Set an error "ng-class" styling.
    $scope.setErrorStyle = function( style ) {

        $scope.errorStyleClass = style;
    
    };

    $scope.deleteDoneTasks = function() {

        var openTaskList = [];
        var doneTaskList = []; 
        var i = 0, z = 0;

        // find all open (or done) tasks
        for( key in $scope.taskList ) {

              if ( $scope.taskList[key].status === "done" ) {
                doneTaskList[ z ] = $scope.taskList[key];
                z++;
              } 
              else {
                openTaskList[ i ] = $scope.taskList[key];
                i++;
              }
        }

        // go on and save a new list with all open tasks
        if ( openTaskList.length != 0  && doneTaskList.length !=0 ) {
          
          $scope.taskList = openTaskList;
          $scope.saveList();
        
        } else if ( openTaskList.length === 0 ) { 

        // hey hero, all tasks are done :)
          $scope.taskList = [{}];
          $scope.saveList();
          $scope.taskList = [];
        
        }
    };

    
    // Refresh angular "taskList"-scope 
    // and call a "saving" function.
    $scope.addTask = function() {

        // New task status is always "open" 
        var addTaskStatus = "open";

        $scope.taskList.push( {name: $scope.taskName, status: addTaskStatus} );        

        // Now cleaning input textfield
        $scope.taskName = undefined;
        
        // Go on and save the new task ... 
        $scope.saveList();

    };

    // Append a getting JSON-Object to current todo list.
    $scope.addList = function( jsonObj ) {

      // Don't append an empty json object
      if ( jsonObj[0].name != undefined ) {

        $scope.taskList = $scope.taskList.concat( jsonObj );
      
      }

    };
  
    // Get a valid JSON via HTTP GET-Request from 'get.php' file
    // then call an "add list to tasklist"-function.
    $scope.getList = function() {

      $http.get( $scope.getUrl ).
        success(function(data, status, headers, config) {
          try {
            
            var str = angular.toJson(data);

            // Ignore an empty source file
            if ( str != "{}" && str != "[{}]" ) { 

              // Is data JSON valide ... ?
              data = angular.fromJson( data );

              // ... then go on and refreshing the scope.
              $scope.addList( data );
            }
          }
          catch ( e ) {
            console.log( "Get invalid JSON data" );
          }
        }).
        error(function( data, status, headers, config ) {
          console.log( data );
          console.log( status );
        });

    };    

    // Send current $scope.taskList via HTTP POST-Request to 'post.php' file.
    $scope.saveList = function() {

      $http.post( $scope.postUrl, $scope.taskList ).
        success(function( data, status, headers, config ) {
          console.log( data );
          console.log( status );
        }).
        error(function( data, status, headers, config ) {
          console.log( data );
          console.log( status );
        });
        
    };
  }