(function() {
  'use strict'

  angular.module('app')
    .component('uiroutertest', {
      controller: ('showController', showController),
      templateUrl: "./html/editpost.html"
    })

    showController.$inject = ['shareDataService', '$state', '$scope', '$stateParams']

   function showController(shareDataService, $state, $scope, $stateParams){

      const $ctrl = this

      $scope.editId = $stateParams.editId

      $ctrl.allBlogs = shareDataService

      shareDataService.oneBlog($scope.editId)
      shareDataService.oneComment($scope.editId)

      $ctrl.newComment = function(addCommentPost, post, id, form) {
        post.push({author:addCommentPost.author, comment:addCommentPost.comment})

        shareDataService.addComment(addCommentPost, id)

        form.$setPristine()
        form.$setUntouched()
        $ctrl.newCommentPost = {}
      }

      $ctrl.removeCommentFromEditPage = function(Cid, Bid){
        for (var i = 0; i < $ctrl.allBlogs.oneBlogComment.length; i++) {
          if ($ctrl.allBlogs.oneBlogComment[i].id == Cid){
            $ctrl.allBlogs.oneBlogComment.splice(i, 1);
          }
        }
        shareDataService.deleteComment(Cid, Bid)
      }

      $ctrl.changepost = function(item){
        console.log($ctrl.oneTimeUse)
      }

      // this.navigation(e) {
      //   e.preventDefault()
      //   $state.go('home')
      // }


    }

}());
