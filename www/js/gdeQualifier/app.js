/*

 GT.M GDE Qualifier show for EWD Lite 2013/07/25 12:09
 
  Written by Kiyoshi Sawada <casiopea.tpine@gmail.com>
  Copyright c 2013 Japan DynaSystems Inc.
 
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License (AGPL)
  as published by the Free Software Foundation, either version 3 of
  the License, or (at your option) any later version.
 
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU Affero General Public License for more details.
 
  You should have received a copy of the GNU Affero General Public 
  License along with this program. 
 If not, see http://www.gnu.org/licenses/.
 
*/

var AboutGDEqualifier = function() {

  Ext.Msg.alert(
	'Information', 
	'GDE Qualifier Update Date'
  );

};
  
var closeMsg = function() {
  Ext.defer(function() {
    Ext.MessageBox.hide();
  },1500);
};  

EWD.onSocketsReady = function() {
  Ext.getCmp('loginBtn').show();
};

EWD.onSocketMessage = function(messageObj) {
  if (EWD.sockets.trace) console.log("serverMessageHandler: messageObj = " + JSON.stringify(messageObj));

  if (messageObj.type === 'EWD.form.login') {
    EWD.password = Ext.getCmp('password').getValue();
    if (messageObj.ok) Ext.getCmp('loginPanel').destroy();
	
    EWD.sockets.sendMessage({type: "initQualifierGet"});
  }

  if (messageObj.type === 'initQualifierView') {
    EWD.sockets.sendMessage({type: "getRegQualifierData"});
    EWD.sockets.sendMessage({type: "getSegQualifierData"});
    EWD.sockets.sendMessage({type: "getNames"});
    EWD.sockets.sendMessage({type: "getMap"});
  }

  if (messageObj.type === 'AboutGDEqualifier') {
    var date=messageObj.message;

  
  }
  
  if (messageObj.type === 'getRegQualifierData') {
    EWD.stores.gdeRegionGridStore.loadData(messageObj.message);
    return;
  }

  if (messageObj.type === 'getJournalQualifierData') {
    EWD.stores.gdeJournalGridStore.loadData(messageObj.message);
    return;
  }
  
  if (messageObj.type === 'getSegQualifierData') {
    EWD.stores.gdeSegmentGridStore.loadData(messageObj.message);
    return;
  }

  if (messageObj.type === 'getNames') {
    EWD.stores.gdeNamesGridStore.loadData(messageObj.message);
    return;
  }

  if (messageObj.type === 'getMap') {
    EWD.stores.gdeMapGridStore.loadData(messageObj.message);
    return;
  }
  
};
