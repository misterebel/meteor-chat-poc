import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Engagements } from './engagements';

console.log('messages from api');

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {

  // const Engagements = new Mongo.Collection('engagements');

  // This code only runs on the server
  Meteor.publish('messages', function messagesPublication() {
    var userId = this.userId;
    var headers = this.connection.httpHeaders;

    if (userId) {
      Engagements.upsert({userId: userId,  publication: 'messages'}, {
          $set: {
            userId: userId,
            connection: headers,
            publication: 'messages',
            publicationId: 1,
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
          publication: 'messages',
        });
      }
    });

    return Messages.find();
  });
}
