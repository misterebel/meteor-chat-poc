import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import uiRouter from 'angular-ui-router';
import angularAvatar from 'angular-avatar';
import perfectScrollbar from 'perfect-scrollbar';
import angularPerfectScrollbar from 'angular-perfect-scrollbar';

import { Messages } from '../../../api/messages.js';
import { Chats } from '../../../api/chats.js';

import template from './chat-box.html';

class ChatBoxCtrl {
  constructor($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    $scope.viewModel(this);

    var subscriptionHandle = this.subscribe('fetch-chat', () => [$stateParams.id], {
      onReady: function () {
        console.log("onReady And the Items actually Arrive", arguments);
        // subscriptionHandle.stop();  // Stopping the subscription, will cause onStop to fire
      },
      onStop: function (error) {
        if (error) {
          console.log('An error happened - ', error);
        } else {
          console.log('The subscription stopped');
        }
      }
    });

    this.chatId = $stateParams.id;


    console.log('subscription Handle', subscriptionHandle);

    this.helpers({
      chat() {
        console.log('calling getChat', $stateParams.id);

        return Chats.find({_id: $stateParams.id});
      }
    })
  }

  addMessage(newMessage) {
    let userId = Meteor.userId();
    console.log(userId, 'messages', newMessage, this.chatId, this.id);
    let message = {
      createdAt: new Date,
      text: newMessage,
      userId: userId
    };
    // Insert a message into the collection
    Chats.update({_id: this.chatId}, {$push: {messages: message}});

    // Clear form
    this.newMessage = '';
  }

  isSelf(userId) {
    console.log('isSelf', userId, Meteor.userId(), userId == Meteor.userId());
    if (userId == Meteor.userId()) {
      return true;
    }
    return false;
  }
}

class NewChatCtrl {
  constructor($scope, $state) {
    $scope.viewModel(this);
    $scope.chatId = new Meteor.Collection.ObjectID().toHexString();
    Chats.insert({
      _id: $scope.chatId,
      createdAt: new Date,
      userId: Meteor.userId()
    });
    $state.go('chat_box', {id: $scope.chatId});
  }
}

export default angular.module('chat', [
  angularMeteor,
  uiRouter,
  'ngAvatar',
  'perfect_scrollbar'
])
  .component('chatBox', {
    bindings: {
      id: '<'
    },
    templateUrl: template,
    controller: ['$scope', '$reactive', '$stateParams', ChatBoxCtrl]
  })
  .config(config);

function config($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $urlRouterProvider.otherwise('/chat');

  $stateProvider
    .state('chat', {
      url: '/chat',
      controller: ['$scope', '$state', NewChatCtrl]
    })
    .state('chat_box', {
      url: '/chat/:id',
      views: {
        'container@': {
          template: '<chat-box id="chatId"></chat-box>'
        }
      },
      controller: function ($scope, $stateParams) {
        $scope.chatId = $stateParams.id;
      }
    });
}

