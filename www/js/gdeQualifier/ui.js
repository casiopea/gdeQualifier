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

EWD.application = {
  name: 'gdeQualifier'
};

EWD.loader = {enabled: false};
EWD.requires = '';

Ext.application({
 name:'GT.M GDE Qualifier show',
 launch: function() {
   if (EWD.loader.enabled) Ext.Loader.setConfig(EWD.loader);
   if (EWD.requires !== '') {
     Ext.require(EWD.requires, function() {EWD.ext4.content()});
   }
   else {
     EWD.ext4.content()
   }
 }
});

EWD.stores = {
  gdeRegionGridStore: Ext.create('Ext.data.Store', {
    fields: [
     { name: 'REGION' }, 
     { name: 'DYNAMIC_SEGMENT' }, 
     { name: 'COLLATION_DEFAULT' },
     { name: 'RECORD_SIZE' },
     { name: 'KEY_SIZE' },
     { name: 'NULL_SUBSCRIPTS' },
     { name: 'STDNULLCOLL' },
     { name: 'JOURNAL' },
     { name: 'INST_FREEZE_ON_ERROR' },
     { name: 'QDBRUNDOWN'  },
     { name: 'ALIGNSIZE' } 
    ]
  }),
  gdeJournalGridStore: Ext.create('Ext.data.Store', {
    fields: [
     { name: 'REGION' }, 
     { name: 'FILE_NAME' },
     { name: 'BEFORE_IMAGE' }, 
     { name: 'BUFFER_SIZE'  }, 
     { name: 'ALLOCATION' }, 
     { name: 'EXTENSION' }, 
     { name: 'AUTOSWITCHLIMIT' } 
    ]
  }),
  
  gdeSegmentGridStore: Ext.create('Ext.data.Store', {
   fields: [
     { name: 'SEGMENT'},
     { name: 'ACCESS_METHOD' },
     { name: 'ALLOCATION' },
     { name: 'BLOCK_SIZE' },
     { name: 'BUCKET_SIZE' },
     { name: 'DEFER' },
     { name: 'ENCRYPTION_FLAG' },
     { name: 'EXTENSION_COUNT' },
     { name: 'FILE_NAME' },
     { name: 'FILE_TYPE' },
     { name: 'GLOBAL_BUFFER_COUNT' },
     { name: 'LOCK_SPACE' },
     { name: 'RESERVED_BYTES' },
     { name: 'WINDOW_SIZE' }
   ]
  }),
  gdeNamesGridStore: Ext.create('Ext.data.Store', {
    fields: [
      {name: 'Global'},
      {name: 'Region'}
    ]
  }),
  gdeMapGridStore: Ext.create('Ext.data.Store', {
    fields: [
      {name: 'From'},
      {name: 'UpTo'},
      {name: 'Region'},
      {name: 'Segment'},
      {name: 'File'}
    ]
  })
  
};

EWD.grid = {
  gdeRegionGridPanel: Ext.create('Ext.grid.Panel',{
    frame: true,
    id: 'gdeRegionGrid',
    store: EWD.stores.gdeRegionGridStore,
    width: 570,
    align: 'center',
    xtype: 'gridpanel',
    viewConfig: {
        markDirty: false
     },
     columns: [
       {  dataIndex: 'REGION',            text: 'Region',    width:  80, xtype: 'gridcolumn' },
       {  dataIndex: 'DYNAMIC_SEGMENT',   text: 'Dy Seg',    width:  80, xtype: 'gridcolumn' },
       {  dataIndex: 'COLLATION_DEFAULT', text: 'Def Coll',  width:  50, xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'RECORD_SIZE',       text: 'Rec Size',  width: 100, xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'KEY_SIZE',          text: 'Key Size',  width:  50, xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'NULL_SUBSCRIPTS',   text: 'Null Subs', width:  80, xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'STDNULLCOLL',       text: 'Std Null Coll', width: 80,  xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'INST_FREEZE_ON_ERROR', text: 'Inst Freeze on Error', width: 80,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'QDBRUNDOWN',        text: 'Qdb Rndwn',  width: 80,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'JOURNAL',           text: 'Jnl',   width: 50,   xtype: 'gridcolumn', align: 'center' }
     ]
  }),

  gdeJournalGridPanel: Ext.create('Ext.grid.Panel',{
    frame: true,
    id: 'gdeJournalGrid',
    store: EWD.stores.gdeJournalGridStore,
    width: 570,
    align: 'center',
    xtype: 'gridpanel',
    viewConfig: {
        markDirty: false
     },
     columns: [
       {  dataIndex: 'REGION',            text: 'Region',    width:  80, xtype: 'gridcolumn' },
       {  dataIndex: 'FILE_NAME',         text: 'Jnl File',   width: 150,   xtype: 'gridcolumn' },
       {  dataIndex: 'BEFORE_IMAGE',      text: 'Before',     width:  50,   xtype: 'gridcolumn' },
       {  dataIndex: 'ALLOCATION',        text: 'Alloc',      width:  80,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'EXTENSION',         text: 'Exten',      width:  80,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'AUTOSWITCHLIMIT',   text: 'AutoSwitch', width: 100,   xtype: 'gridcolumn', align: 'right' }

     ]
  }),

  gdeSegmentGridPanel: Ext.create('Ext.grid.Panel',{
    frame: true,
    id: 'gdeSegmentGrid',
    store: EWD.stores.gdeSegmentGridStore,
    width: 570,
    align: 'center',
    xtype: 'gridpanel',
    viewConfig: {
        markDirty: false
     },
     columns: [
       {  dataIndex: 'SEGMENT',         text: 'Segment',  width:   80,   xtype: 'gridcolumn' },
       {  dataIndex: 'FILE_NAME',       text: 'File',     width:  150,   xtype: 'gridcolumn' },
       {  dataIndex: 'ACCESS_METHOD',   text: 'Acc',      width:   50,   xtype: 'gridcolumn' },
       {  dataIndex: 'FILE_TYPE',       text: 'Type',     width:   80,   xtype: 'gridcolumn' },
       {  dataIndex: 'BLOCK_SIZE',      text: 'Block',    width:   80,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'ALLOCATION',      text: 'Alloc',    width:  100,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'EXTENSION_COUNT', text: 'Exten',    width:   80,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'GLOBAL_BUFFER_COUNT', text: 'Glob Buff',  width:  80,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'LOCK_SPACE',      text: 'Lock Sp',  width:   80,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'RESERVED_BYTES',  text: 'Reserv',   width:   50,   xtype: 'gridcolumn', align: 'right' },
       {  dataIndex: 'ENCRYPTION_FLAG', text: 'Encrypt',  width:   50,   xtype: 'gridcolumn', align: 'right' }
     ]
  }),
  gdeNamesGridPanel: Ext.create('Ext.grid.Panel',{
    frame: true,
    id: 'gdeNamesGrid',
    store: EWD.stores.gdeNamesGridStore,
    width: 370,
    align: 'center',
    xtype: 'gridpanel',
    viewConfig: {
        markDirty: false
     },
     columns: [
       {  dataIndex: 'Global',       text: 'Global',    width: 150,  xtype: 'gridcolumn' },
       {  dataIndex: 'Region',       text: 'Global',    width: 150,  xtype: 'gridcolumn' }
     ]
  }),
  gdeMapGridPanel: Ext.create('Ext.grid.Panel',{
    frame: true,
    id: 'gdeMapGrid',
    store: EWD.stores.gdeMapGridStore,
    width: 570,
    align: 'center',
    xtype: 'gridpanel',
    viewConfig: {
        markDirty: false
     },
     columns: [
       {  dataIndex: 'From',    text: 'Names From',      width: 100,       xtype: 'gridcolumn'  },
       {  dataIndex: 'UpTo',    text: 'Names Up To',     width: 100,       xtype: 'gridcolumn'  },
       {  dataIndex: 'Region',  text: 'Region',          width: 100,       xtype: 'gridcolumn'  },
       {  dataIndex: 'Segment', text: 'Segment',         width: 100,       xtype: 'gridcolumn'  },       
       {  dataIndex: 'File',    text: 'File',            width: 200,       xtype: 'gridcolumn'  }      
    ]
  })
  
};

EWD.ext4 = {
  content: function () {
    Ext.create("Ext.container.Viewport", {
      layout: "border",
      renderTo: Ext.getBody(),
      items: [
        {  id: "northPanel",
           region: "north",
           resizable: true,
	       dock: 'top',
	       xtype: 'toolbar',
	       items: [
	        'GT.M GDE/DSE Qualifier Viewer'
		    , '->' ,
			{  handler: function () {
				 AboutGDEqualifier();
               },
		       text: 'About',
		       xtype: 'button'
			}
          ]		    
	    },
        {  id: "centerPanel",
           region: "center",
           resizable: true,
           xtype: "tabpanel",
	   activeTab: 0,
           items: [
             {  id: "regionTabPanel",
                layout: "fit",
                title: "Region",
                xtype: "panel",
                items: EWD.grid.gdeRegionGridPanel
             },{
 	        id: "journalTabPanel",
                layout: "fit",
                title: "Journal",
                xtype: "panel",
                items: EWD.grid.gdeJournalGridPanel
             },
	     {  id: "segmentTabPanel",
                layout: "fit",
                title: "Segment",
                xtype: "panel",
                items: EWD.grid.gdeSegmentGridPanel
             },
	     {  id: "gdeNamesTabPanel",
                layout: "fit",
                title: "Names",
                xtype: "panel",
                items: EWD.grid.gdeNamesGridPanel
             },
	     {  id: "gdeMapTabPanel",
                layout: "fit",
                title: "Map",
                xtype: "panel",
                items: EWD.grid.gdeMapGridPanel
             }
	  ]
        }
      ]
    });

    // Login
    Ext.create("Ext.window.Window", {
      autoShow: true,
      height: 200,
      id: "loginPanel",
      layout: "fit",
      modal: true,
      closable: true,
      renderTo: Ext.getBody(),
      title: "GT.M GDE Qualifier",
      width: 400,
      items: [
        {  bodyPadding: 10,
           xtype: "form",
           id: 'loginForm',
           items: [
             {  title: "See ewdGateway2 startup file for password",
                xtype: "fieldset",
                items: [
                  {  allowBlank: false,
                     fieldLabel: "Password",
                     id: "password",
                     inputType: "password",
                     name: "password",
                     xtype: "textfield",
		     listeners: {
		       afterrender : function(field) { field.focus(false, 1000); }
		     }
                  }
                ]
             }
           ],
           buttons: [
             {  handler: function () {
                  if (!EWD.initialised) {
                    Ext.Msg.alert('WebSocket connection not initialised: please wait a few seconds and try again'); 
                    closeMsg();
                    return;
                  }
                  EWD.sockets.submitForm({
                    id: 'loginForm',
                    alertTitle: 'An error occurred',
                    messageType: 'EWD.form.login'
                  });
                },
                text: "Login",
                xtype: "button",
                id: 'loginBtn',
                hidden: true
             }
           ]
        }
      ]
    });    

    
  }  
}