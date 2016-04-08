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
    outp: Array<Object>;
    title = 'Enter SRA, SRP, SRS numbers...';
    take_sra(sra:string){
        //sra = this.value;
        return sra;
    }
    retrieve(sra){
        var out = [];
        Meteor.call('SRAdata',sra,function(err,res){
            if (err) throw err;
            else {
                // Prints everything to console. Need to beautify
                //console.log(res);
                out.push(res);
            }
            console.log(out);
        });
        this.outp = out;
        //console.log(outp);
        //return out;
    }
}