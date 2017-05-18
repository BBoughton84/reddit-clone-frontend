(function() {
  'use strict'

  angular.module('app')
    .component('display', {
      controller: ('showController', showController),
      templateUrl: "../html/displayposts.html"
    })

    showController.$inject = ['shareDataService', '$state']

   function showController(shareDataService, $state){

      const $ctrl = this

      $ctrl.navigation = function(e){
        e.preventDefault()
        $state.go('home')
      }

      $ctrl.wholeArray = shareDataService

      $ctrl.toggle = function(){
        $ctrl.toggle = true
      }

      $ctrl.newComment = function(newComment, post, form) {
        post.comments.push({author:newComment.author, comment:newComment.comment})
        shareDataService.addComment(newComment, post)

        form.$setPristine()
        form.$setUntouched()
        $ctrl.newCommentMain = {}

      }

      $ctrl.removePost = function(item){
        shareDataService.deletePost(item.id)
      }

      $ctrl.upVote = function(post){
        post.votes++
        shareDataService.Votes(post)
      }
      $ctrl.downVote = function(post) {
        if (post.votes > 0){
          post.votes--
          shareDataService.Votes(post)
        }
      }
    }

}());
