define([
    'text!templates/inputs/text.html'
], function (templateInputText) {
	return ['$scope','app',function (sc,app) {
        sc.isAuthenticated = function() {
            return app.isAuthenticated();
        }
        sc.fields = [
            {
                id:1,
                label:'Email',
                type:'text'
            },
            {
                id:2,
                label:'Password',
                type:'text'
            }
        ];
        sc.getTemplate = function(type) {
            var matcher = {
                text:templateInputText
            };
            return matcher[type] || templateInputText
        }
        sc.removeField = function(field) {
            field.markedForDelete = true;
        }
        sc.submit = function(field) {
            if(!field.editing || !sc.isValid(field)) return;
            field.editing = false;
        }
        sc.edit = function(field) {
            field.editing = true;
        }
        sc.promptRemoveField = function(field) {
            field.promptOpen = true;
        }
        sc.promptOpen = function(field) {
            return field.promptOpen;
        }
        sc.cancelPrompt = function(field) {
            field.promptOpen = false;
        }

        sc.inEditMode = function(field) {
            return field.editing;
        }
        sc.isValid = function(field) {
            return field.label && field.type;
        }
        sc.addField = function() {
            var newField = {
                id:'',
                label:'',
                placeHolder:'',
                type:''
            };
            sc.edit(newField);
            sc.fields.push(newField);
        }
    }];
});