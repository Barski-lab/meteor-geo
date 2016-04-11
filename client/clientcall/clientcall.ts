'use strict';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component} from 'angular2/core';
import {HTTP} from 'meteor/http';
import { Meteor } from 'meteor/meteor';


//var parseString = Npm.require('xml2js').parseString;


@Component({
    selector: 'clientcall',
    templateUrl: 'client/clientcall/clientcall.html',
    providers: [Client_call],
})

export class Client_call {
    title = 'client call';
    //output:string;
    //output = this.call('54321');

    call(sra){
        var id = [];
        var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=sra&term='+sra;
        HTTP.call('GET',url,{}, function(err,res){
            var output = [];
            if (err) console.log(err);
            else{
                Meteor.call('xml2json',res.content,function(err,result){
                    console.log(result.eSearchResult.IdList[0].Id);
                    id.push (result.eSearchResult.IdList[0].Id);
                    var url1 = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sra&id='+id.join(',');
                    HTTP.call('GET',url1,function(error,result){
                        if (error) console.log(error);
                        else{
                            Meteor.call('xml2json',result.content,function(errors,results){
                                var mdata=results.EXPERIMENT_PACKAGE_SET.EXPERIMENT_PACKAGE;
                                console.log(results.EXPERIMENT_PACKAGE_SET.EXPERIMENT_PACKAGE[0]);
                                for(var i=0; i<id.length; i++){
                                    Meteor.call('insert',{id:id[i]});
                                }
                            });
                        }
                    });
                });
                //callback({out:res.content})
            }
        });
    }
    //parseString()
}