import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import 'angular-material-data-table';

import { Meteor } from 'meteor/meteor';
import { Engagements } from '../../../api/engagements.js';
import { Chats } from '../../../api/chats.js';
import { Roles } from 'meteor/alanning:roles';

import './home.html';
import './engagements.html';
import 'angular-material-data-table';

class EngagementsCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.subscribe('engagements');
    console.log('subscribed')

    this.helpers({
      engagements() {
        console.log('calling engagements');

        return Engagements.find({}, {
          sort: {
            createdAt: 1
          }
        });
      }
    })
  }

  openEngagement(publicationId) {
    window.open('/chat/'+publicationId, '', 'width=280,height=520,toolbar=0,resizable=0,menubar=0,status=0,titlebar=0');
  }

  addAdvertisement(chatId) {
    let ads = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsaDi5TsNDOtGVNS0WWLAly3MpvMTHGDhObBp5775ppod9-h9nKg',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRpsAUaxx-b6tznOsvzdVXut0mXRwjwg4K0A4UHt4ydWXUnxMdLeQ',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQYu1Y1TKyOBtsZ--1yKhnXk3ohMfUqeH_SJRWo1PmDhQFCbak',
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRczevAvPSSdKN6x-Sjd_9QKJSIwfidb60ypIbKm6kAuQb6bTPcVw',
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSFtK71EEgJvmpLKrK83gExAdP24TI1ECK1-tYDPW74TqBkrveNQ',
      'http://content.linkoffers.net/SharedImages/Products/219967/606827.png'
    ];

    let num = Math.floor((Math.random() * 6));
    let message = {
      system: true,
      src: ads[num],
      createdAt: new Date
    }

    Chats.update({_id: chatId}, {$push: {messages: message}});
  }
}

class HomeCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.subscribe('allUsers');
    console.log('subscribed')

    this.helpers({
      users() {
        return Meteor.users.find({}, {
          sort: {
            createdAt: 1
          }
        });
      }
    })

    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      this.isAdmin = true;
    }
  }

  makeAdmin(userId) {
    // var currentUserId = Meteor.userId();
    Meteor.call('addAdminRole', userId, 'admin');
  }

  removeAdmin(userId) {
    // var currentUserId = Meteor.userId();
    Meteor.call('removeAdminRole', userId);
  }

}

export default angular.module('admin', [
  angularMeteor,
  ngMaterial,
  'md.data.table'
])
  .component('adminHome', {
    templateUrl: 'imports/ui/components/admin/home.html',
    controller: ['$scope', HomeCtrl]
  })
  .component('adminEngagements', {
    templateUrl: 'imports/ui/components/admin/engagements.html',
    controller: ['$scope', EngagementsCtrl]
  })
  .filter('contains', function() {
    return function (array, needle) {
      if (array && Array.isArray(array)) {
        return array.indexOf(needle) >= 0;
      }
      return false;
    };
  })
  .config(config);

function config($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $urlRouterProvider.otherwise('/admin/home');

  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      views: {
        'header': {
          template: '<nav></nav>'
        }
      }
    })
    .state('admin.home', {
      url: '/home',
      views: {
        'container@': {
          template: '<admin-home></admin-home>'
        }
      }
    })
    .state('admin.engagements', {
      url: '/engagements',
      views: {
        'container@': {
          template: '<admin-engagements></admin-engagements>'
        }
      }
    })
}
