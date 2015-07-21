
//Template
//Its our template based on what we want, but its also
//with the full power of a backbone router
var AppRouter = Backbone.Router.extend({
    routes: {
        "users/": function () {
        	console.log('We are here at the users path');
        },
        "accounts/": function () {
        	console.log('We are here at the accounts path')
        },
    }
});
// Initiate the router
var appRouter = new AppRouter;

app_router.on('route:defaultRoute', function(actions) {
    alert(actions);
})

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();