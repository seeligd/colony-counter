/* Author:
	David Seelig
*/

// use the module pattern for the counter code (requires paper.js)
var Counter = (function($){

	// set up vars
	var canvas;
	var ctx;
	var raster; // our handle on the image
	var tool; // handle our mouse events

	function init(id){
		// see http://paperjs.org/tutorials/getting-started/using-javascript-directly/
		paper.install(window);
		canvas = document.getElementById(id);
		paper.setup(canvas);

		tool = new Tool();

		tool.onMouseDown = onMouseDown;
		tool.onMouseDrag = onMouseDrag;
		// view.onFrame = onFrame;
	}

	function onFrame(event) {
		// nothing yet
	}

	function onMouseDown(event) {
		// won't be able to get the raster, but maybe that's ok:
		// https://github.com/paperjs/paper.js/issues/45
		var hitResult = paper.project.hitTest(event.point, {});
		log(event.point.x, event.point.y);
	}

	function onMouseDrag(event) {
		// for now assume it's not hitting an element
		raster.position = raster.position.add(event.delta);
	}

	function presentImage(id) {
		var raster = new Raster(id);
		raster.position = view.center;
		view.draw();
	}

	function testImage() {
		// load image into resources so Raster can find it
		$('<img />')
			.attr('src', 'img/rhino.jpg')
			.attr('id', 'rhino')
			.load(function() {
				$("#resources").append( $(this) );
				raster = new Raster('rhino');
				raster.position = view.center;
				view.draw();
			});

	};

	function testCanvas(){
		var path = new Path();
		path.strokeColor = 'black';
		var start = new Point(100, 100);
		path.moveTo(start);
		path.lineTo(start.add([ 200, -50 ]));
		view.draw();
	}

	function zoomIn(){
		project.activeLayer.scale(1.2);
		view.draw();
	}

	function zoomOut(){
		project.activeLayer.scale(1/1.2);
		view.draw();
	}

		/*
		var img = new Image();

		img.onload = function() {
			draw();
		};
		*/

	return {
		init: init,
		testImage: testImage,
		zoomIn: zoomIn,
		zoomOut: zoomOut
	}
})(jQuery);


jQuery.noConflict();
jQuery(document).ready(function($){
	// now you can use $(document).ready
	log('about to call counter.init (outside)');
	Counter.init("slate");
	Counter.testImage("slate");

	$("#zoom_in").click(function() {
		Counter.zoomIn();
	})
	$("#zoom_out").click(function() {
		Counter.zoomOut();
	})


});

