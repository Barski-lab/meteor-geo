///<reference path="../../server/main.ts"/>
'use strict';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component} from 'angular2/core';
import { Meteor } from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import {Client_call} from "../clientcall/clientcall";

//import {Searches} from '../../server/main.ts';

@Component({
    selector: 'query',
    templateUrl: 'client/query/query.html',
    directives: [Client_call],
})


export class Query{
    //@Output outp;
    title = 'Enter SRA, SRP, SRS numbers...';
    take_sra(sra:string){
        //sra = this.value;
        return sra;
    }
    retrieve(sra){
        var out = [];
        if (sra!= "") {
            Meteor.call('SRAdata', sra, function (err, res) {
                if (err) {
                    console.log(err)
                }
                else {
                    // Prints everything to console. Need to beautify
                    //console.log(res);
                    out.push(res);
                }
                console.log(out);
                return out[0][0].EXPERIMENT_PACKAGE_SET;
            });

            //console.log(outp);
            //return out;
            //Query.call('sr');
        }
    }
    
}