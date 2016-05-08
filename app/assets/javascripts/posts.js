
var posts= angular.module("posts", []); 
posts.controller("postsCtrl", ['$http','$log',function($http, $log) {
    var postCtrl = this
    postCtrl.$log = $log
    $http.get("/blog/posts", {
        headers: {'Accept': 'application/json'}
    }).then(
        function successCallback(response){
	    postCtrl.post_list = response.data;
        },
        function errorCallback(response){
	    postCtrl.$log.log(response)
        }
    )
    
    postCtrl.new_post = {};
    postCtrl.create_post = function() {
	$http.post('/blog/posts', postCtrl.new_post,{
            headers: {'Accept': 'application/json',
		      'Content-Type': 'application/json'
		     }
	}).then(
            function successCallback(response){
		postCtrl.post_list.unshift(response.data);
		postCtrl.new_post = {};
            },
            function errorCallback(response){
		postCtrl.$log.log(response)
            }
	)
    }
    postCtrl.delete_post = function(post) {
	$http.delete('/blog/posts/'.concat(post._id.$oid ),{
            headers: {'Accept': 'application/json',
		      'Content-Type': 'application/json'
		     }
	}).then(
            function successCallback(response){
		postCtrl.post_list.splice(postCtrl.post_list.indexOf(post),1)
            },
            function errorCallback(response){
		postCtrl.$log.log(response)
            }
	)
    }
    postCtrl.update_post = function(post) {
	$http.put('/blog/posts/'.concat(post._id.$oid ),{
            headers: {'Accept': 'application/json',
		      'Content-Type': 'application/json'

		     }
	}).then(
            function successCallback(response){
		var replace_index = postCtrl.post_list.indexOf(post)
		postCtrl.post_list[replace_index] = post
            },
            function errorCallback(response){
		postCtrl.$log.log(response)
            }
	)
    }
}]);
