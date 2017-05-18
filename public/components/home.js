(function() {
  'use strict'

  angular.module('app')
    .component('home', {
      controller: ('homeController', homeController),
      templateUrl: "./html/home.html"
    })

    homeController.$inject = ['shareDataService', '$state']

   function homeController(shareDataService, $state){

      const $ctrl = this

      $ctrl.navigation =function(e) {
        e.preventDefault()
        $state.go('home')
      }


    }

}());
