import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {full_data} from './fulldata';

export var Searches = new Mongo.Collection('searches');

Meteor.startup(() => {
 // code to run on server at startup
});

var eutils = Npm.require('ncbi-eutils');
var parseString = Npm.require('xml2js').parseString;


Meteor.methods({
    // Retrieves an id that is associated with a particular SRA accession number
    SRAdata :function(sra){
        //if(sra!="") {
            var id = [];
            var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=sra&term=' + sra;
            var result = HTTP.get(url, {timeout: 30000});
            if (result.statusCode == 200) {
                parseString(result.content, function (err, res) {
                    if (err) console.log(err);
                    else {
                        console.log(res.eSearchResult.IdList[0].Id[0]);
                        id.push(res.eSearchResult.IdList[0].Id);
                    }
                });
            } else {
                console.log("Response issue: ", result.statusCode);
            }
            Searches.insert({SRAid: id});
            return full_data(id.join(','));
        //}
    },

    insert: function(data){
        Searches.insert(data);
    },

    update: function(query,checkdata,data){
       Searches.update(query,checkdata,data,{upsert:'TRUE',multi:'TRUE'});
    },

    xml2json: function(data){
        var json_client = [];
        parseString(data,function(err,result){
            //console.log(result);
            json_client.push(result);
        });
    return json_client[0];
    }
});

