import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {Searches} from './main.ts'

var eutils = Npm.require('ncbi-eutils');
var parseString = Npm.require('xml2js').parseString;

export function full_data(id){
    var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sra&id='+id;
    var result = HTTP.get(url, {timeout:30000});
    if(result.statusCode==200) {
        parseString(result.content,function(err,res){
            console.log(res);
            //Adding all the important data to the Mongo and showing exporting that to client
        });
        
    } else {
        console.log("Response issue: ", result.statusCode);
    }
}