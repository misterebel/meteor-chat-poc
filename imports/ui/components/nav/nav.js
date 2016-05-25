import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';

import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

import template from './nav.html';

class NavCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    $scope.isAdmin = false;
    $scope.isDev = false;

    if (Roles.userIsInRole(Meteor.userId(), ['developer'])) {
      $scope.isDev = true;
    }

    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      $scope.isAdmin = true;
    }
  }
}

export default angular.module('nav', [
  angularMeteor,
  ngMaterial
])
  .component('nav', {
    templateUrl: 'imports/ui/components/nav/nav.html',
    controller: ['$scope', NavCtrl]
  });
