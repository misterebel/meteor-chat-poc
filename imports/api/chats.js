import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Engagements } from './engagements';

console.log('chats from api');

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('fetch-chat', function publishFunction(chatId) {
    var self = this;

    var userId = this.userId;
    var headers = this.connection.httpHeaders;

    if (userId) {
      Engagements.upsert({userId: userId,  publication: 'chats'}, {
          $set: {
            userId: userId,
            connection: headers,
            publication: 'chats',
            publicationId: chatId,
            createdAt: new Date()
          }
      });

    }
    console.log('user connected', {userId: userId, connection: this.connection.httpHeaders});
    // console.log(this._session.socket.);
    this._session.socket.on("close", function() {
      console.log('CLOSING');
    });

    console.log(this._session.socket.on)

    this._session.socket.on("data", function() {
      console.log('data');
    });

    this.onStop(function() {
      console.log('user disconnected', {userId: userId});
      if (userId) {
        Engagements.remove({
          userId: userId,
          publication: 'chats',
          publicationId: chatId
        });
      }
    });

    console.log(chatId, 'chatId inside');
    self.ready();
    return Chats.find({_id: chatId});

  });
}
