require.config({
	baseUrl: "/js",
	paths: {
		"jquery": "../bower_components/jquery/dist/jquery",
		"bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.js"
	},
	shim: {
		"bootstrap": {
			deps: ["jquery"]
		}
	}
});

require(["init"], function(){

});