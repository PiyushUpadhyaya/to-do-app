import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';
  user_name = '';

  /*@ngInject*/
  constructor($location,$uibModal,$http, $scope, socket,Auth) {

    this.$location = $location;
    this.$http = $http;
    this.socket = socket;
    this.Auth=Auth;
    this.$uibModal = $uibModal;
    console.log(Auth);
    //var getCurrentUser = Auth.getCurrentUserSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

/*  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }*/


  addThing(user) {
//    console.log(this.Auth.isLoggedIn());
    this.Auth.isLoggedIn()
    .then((as) => {
      // Logged in, redirect to home
      console.log(as);
      if(!as){
          this.$location.path('/login');
      }

    })

    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing,
        user_name: user,
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

  editThing(thing) {
    thing.name = "LOL";
    this.$http.put(`/api/things/${thing._id}`, thing)
    .then( response=> {
      console.log(response);
    });
  }

  getThing(user_name){
    this.Auth.isLoggedIn()
    .then((as) => {
      // Logged in, redirect to home
      console.log(as);
      if(!as){
          this.$location.path('/login');
      }

    })
    console.log('tip');
    this.$http.get('/api/things/'+user_name)
    .then(response => {
      this.awesomeThings = response.data;
      console.log(response.data);
      this.socket.syncUpdates('thing', this.awesomeThings);
    });
  }

}

export default angular.module('appApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
