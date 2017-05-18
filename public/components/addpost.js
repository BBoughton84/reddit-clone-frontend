(function() {
  'use strict'

  angular.module('app')
    .component('addpost', {
      controller: ('addController', addController),
      templateUrl: "../html/addpost.html"
    })


    addController.$inject = ['$http', 'shareDataService']

      function addController($http, shareDataService){
        const $ctrl = this

        $ctrl.submit = function(form) {

          $ctrl.post.date = new Date()
          $ctrl.post.votes = 0
          $ctrl.post.comments = []

          shareDataService.PostBlog($ctrl.post)

          form.$setPristine()
          form.$setUntouched()
          $ctrl.customFalse()
          $ctrl.post = {}
        }

        $ctrl.$onInit = function(){
          $ctrl.custom = false
        }
        $ctrl.customFalse = function(){
          $ctrl.custom = false
        }


      }


}());
