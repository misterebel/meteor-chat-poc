import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import './home.html';
import './user.html';
import '../../../startup/accounts-config.js';

class AppCtrl {
  constructor($scope) {
    $scope.viewModel(this);
  }
}

class UserCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      currentUser() {
        return Meteor.user();
      }
    })
  }

  openChat() {
    window.open( '/chat', '', 'width=320,height=520,toolbar=0,resizable=0,menubar=0,status=0,titlebar=0')
  }
}

export default angular.module('app', [
  angularMeteor,
  ngMaterial,
  uiRouter,
  'accounts.ui'
])
  .component('appHome', {
    templateUrl: 'imports/ui/components/app/home.html',
    controller: ['$scope', AppCtrl]
  })
  .component('appUser', {
    templateUrl: 'imports/ui/components/app/user.html',
    controller: ['$scope', UserCtrl]
  })
  .config(config);

function config($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';
  //http://stackoverflow.com/questions/22104893/angular-ui-router-how-to-create-a-layout-state

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $urlRouterProvider.otherwise('/app/home');


  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      views: {
        'header': {
          template: '<nav></nav>'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'container@': {
          template: '<app-home></app-home>'
        }
      }
    })
    .state('app.user', {
      url: '/user',
      views: {
        'container@': {
          template: '<app-user></app-user>'
        }
      }
    })
    .state('app.todos', {
      url: '/todos',
      template: '<app-todos></app-todos>'
    })
}

