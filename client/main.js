import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import todosList from '../imports/ui/components/todos/todos';
import nav from '../imports/ui/components/nav/nav';
import admin from '../imports/ui/components/admin/admin';
import chat from '../imports/ui/components/chat/chat';
import app from '../imports/ui/components/app/app';

angular.module('simple-todos', [
  angularMeteor,
  uiRouter,
  ngMaterial,

  todosList.name,
  app.name,
  admin.name,
  chat.name,
  nav.name
])
.config(config);

function config($stateProvider, $locationProvider, $urlRouterProvider, $mdIconProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $urlRouterProvider.otherwise('/app/home');

  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

  $mdIconProvider
    .iconSet('menu',
      iconPath + 'svg-sprite-navigation.svg')
    .iconSet('social',
      iconPath + 'svg-sprite-social.svg')
    .iconSet('action',
      iconPath + 'svg-sprite-action.svg')
    .iconSet('communication',
      iconPath + 'svg-sprite-communication.svg')
    .iconSet('content',
      iconPath + 'svg-sprite-content.svg')
    .iconSet('toggle',
      iconPath + 'svg-sprite-toggle.svg')
    .iconSet('navigation',
      iconPath + 'svg-sprite-navigation.svg')
    .iconSet('image',
      iconPath + 'svg-sprite-image.svg');

  $stateProvider
    .state('developer', {
      url: '/developer',
      template: '<nav></nav><app-home></app-home>'
    })
    .state('todos', {
      url: '/todos',
      template: '<todos></todos>'
    })
}

function onReady() {
  angular.bootstrap(document, ['simple-todos']);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
