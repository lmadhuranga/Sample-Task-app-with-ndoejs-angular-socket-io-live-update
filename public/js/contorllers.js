var SampleModule =  angular.module('Sample.controllers',['ngRoute','Sample.services']);

//  Appreciation delte
SampleModule.controller('SampleControllerss', function($scope,socket)
{
     // Socket listeners
  // ================

    socket.on('init', function (data) {
        $scope.member = data.name
    });
  
  
    socket.on('user:join', function (data) {
        $scope.user_join = data.name
    });
    
    // listing user typing 
    socket.on('user:typing', function (data) {
        // console.log(data.user_typing);
        $scope.user_typing = data.user_typing
    });
    
    socket.on('task:add', function (data) {
        var task_last_id = tasks_array.length+1;
        $scope.tasks.push({id: task_last_id,task:'Task'+task_last_id+' '+data.new_task,active:1});
         
    });
  
    var tasks_array = [
                    {id:'1',task:'Task1',active:1}
                    ,{id:'2',task:'Task2',active:1}
                    ,{id:'3',task:'Task3',active:1}
                    ,{id:'4',task:'Task4',active:1}
                ];
    $scope.tasks = tasks_array;
  
    $scope.add_task = function() {
        var task_last_id = tasks_array.length+1;
        $scope.tasks.push({id: task_last_id,task:'Task'+task_last_id+' '+$scope.new_task,active:1});
        socket.emit('push_data', {
          new_task: $scope.new_task
        },function(res){ 
            $scope.new_task = ''; 
        });
    };
    
    
    // typing-start event caputure
    $scope.user_typing_fun = function uesr_typing(user_typing) {
        socket.emit('user:typing',{user_typing:user_typing},function (argument) {
            //console.log('typing-start call back trigger');
        })
    }
    
    
    
}).controller('TestController', function($scope)
{
    console.log('TestController');
}) 


