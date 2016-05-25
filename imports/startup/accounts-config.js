import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
});

// Accounts.ui.validateNewUser(function (user) {
//   var loggedInUser = Meteor.user();

//   if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
//     // NOTE: This example assumes the user is not using groups.
//     return true;
//   }

//   throw new Meteor.Error(403, "Not authorized to create new users");
// });

// // Generate user initials after Facebook login
// Accounts.onCreateUser((options, user) => {
//   if (user.services && user.services.facebook) {
//     const { first_name, last_name } = user.services.facebook;
//     user.initials = first_name[0].toUpperCase() + last_name[0].toUpperCase();
//   }
//   // Don't forget to return the new user object at the end!
//   return user;
// });
