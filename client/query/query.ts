///<reference path="../../server/main.ts"/>
'use strict';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component} from 'angular2/core';
import { Meteor } from 'meteor/meteor';
//import {Searches} from '../../server/main.ts';

@Component({
    selector: 'query',
    templateUrl: 'client/query/query.html',

})


export class Query{
    id = [];
    take_sra(sra:string){
        sra = this.value;
        return sra;
    }
    retrieve(sra){
        Meteor.call('SRAdata',sra,function(err,res){
            if (err) throw err;
            else {
                //Searches.insert(res);
                //console.log(history.find().fetch());
                //id.push(res);
            }
        });
    }

}