var posts= angular.module("posts", []); 
posts.controller("postsCtrl", function($http, $log) {
    var postCtrl = this
    postCtrl.$log = $log
    $http.get('http://localhost:3000/blog/posts', {
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
	$http.post('http://localhost:3000/blog/posts', postCtrl.new_post,{
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
	$http.delete('http://localhost:3000/blog/posts/'.concat(post._id.$oid ),{
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
});
