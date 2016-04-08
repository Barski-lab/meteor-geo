import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
export var Searches = new Mongo.Collection('searches');

Meteor.startup(() => {
 // code to run on server at startup
});

var eutils = Npm.require('ncbi-eutils');
var parseString = Npm.require('xml2js').parseString;

Meteor.methods({
    SRAdata :function(sra){
        var id = [];
        var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=sra&term='+sra;
        var result = HTTP.get(url, {timeout:30000});
        if(result.statusCode==200) {
            parseString(result.content,function(err,res){
                console.log(res.eSearchResult.IdList[0].Id[0]);
                id.push(res.eSearchResult.IdList[0].Id);
            });
            console.log("response received.");
        } else {
            console.log("Response issue: ", result.statusCode);
        }
        return id;
    },
    actualdata: function(id){
        var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sra&term='+id;
        var result = HTTP.get(url, {timeout:30000});
        if(result.statusCode==200) {
            parseString(result.content,function(err,res){
                console.log(res);
            });
            console.log("response received.");
        } else {
            console.log("Response issue: ", result.statusCode);
        }
    }
})

