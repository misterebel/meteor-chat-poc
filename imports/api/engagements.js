import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Engagements = new Mongo.Collection('engagements');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('engagements', function engagementsPublication() {
    var userId = this.userId;

    return Engagements.find();
  });
}
