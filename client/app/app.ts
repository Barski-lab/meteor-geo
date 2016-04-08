import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import {Query} from "../query/query";

@Component({
  selector: 'app',
  templateUrl: 'client/app/app.html',
  directives: [Query],
})

class Socially {
  
}
 
bootstrap(Socially);