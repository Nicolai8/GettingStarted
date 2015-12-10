define(["jquery"], function () {
	var $h1 = $("h1").first();
	$h1.text($h1.text() + " from JS");
});
