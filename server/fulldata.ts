import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {Searches} from './main.ts';

var eutils = Npm.require('ncbi-eutils');
var parseString = Npm.require('xml2js').parseString;


export function full_data(id){
    var out = [];
    var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sra&id='+id;
    var result = HTTP.get(url, {timeout:30000});
    if(result.statusCode==200) {
        parseString(result.content,function(err,res){
            if (err) console.log(err);
            else {
                out.push(res);
            }
            //Adding all the important data to the Mongo and showing exporting that to client
            //Meteor.call('insert',res, function(err,re){});
        });

    } else {
        console.log("Response issue: ", result.statusCode);
    }
    //Searches.insert(out);
    return out;
}