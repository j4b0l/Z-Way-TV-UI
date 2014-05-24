(function () {
    "use strict";

    window.App.models.device = Backbone.Model.extend({

        defaults: {
            metrics: {},
            selected: false,
            show: true
        },

        methodToURL: {
            'read': '/devices',
            'create': '/devices',
            'update': '/devices',
            'delete': '/devices'
        },

        url: function () {
            return !this.id ? '' : '/' + this.id;
        },

        sync: function (method, model, options) {

            options = options || {};
            options.url = model.methodToURL[method.toLowerCase()] + this.url();
            Backbone.sync(method, model, options);
        },

        parse: function (response) {
            return response.hasOwnProperty('data') ? response.data : response;
        },

        initialize: function () {
            //console.log('Init model');
        },

        command: function (value, command, getParams) {
            var options = {};

            getParams = getParams || {};
            command = command || 'command';

            _.extend(options, {data: getParams});

            options.url = this.methodToURL.read + this.url() + '/' + command + '/' + value;
            Backbone.sync('read', this, options);
        }
    });

})();