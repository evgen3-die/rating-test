Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () {
        return Meteor.subscribe('websites');
    }
});

Router.map(function () {
    this.route('websitesList', {path: '/'});

    this.route('websitePage', {
        path: '/websites/:_id',
        data: function () {
            return Websites.findOne(this.params._id);
        }
    });
});

Router.onBeforeAction('loading');