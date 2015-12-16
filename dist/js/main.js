require.config({
	baseUrl: "/js",
	paths: {
		"jquery": "../../bower_components/jquery/dist/jquery",
		"bootstrap": "../../bower_components/bootstrap-sass/assets/javascripts/bootstrap"
	},
	shim: {
		"bootstrap": {
			deps: ["jquery"]
		}
	}
});

require(["init"], function(){

});