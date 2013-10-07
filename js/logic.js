
var numPics = 12;
var pics = [];

var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var imageContainer;
var box;
var body;

var numButtons;

$( function() {

	body = document.body;

	WINDOW_WIDTH = body.clientWidth;
	WINDOW_HEIGHT = 600;// $(window).height();
	console.log( WINDOW_WIDTH );
	console.log( WINDOW_HEIGHT );

	box = $( '<div/>', { id : 'box', width : WINDOW_WIDTH, height : WINDOW_HEIGHT } ).appendTo( body );

	imageContainer = $( '<div/>', { id : 'imageContainer', width : WINDOW_WIDTH } ).appendTo( box );
	imageContainer.css( 'background-color', '#eeeeee' );

	for( var i=0; i<numPics; ++i ) {
		var img = $( '<img/>', { src : './images/pic' + i + '.jpg', class : 'ScrollImage', position : 'absolute', width : 480, left : 480 * i } ).appendTo( imageContainer );
		img.css( 'left', 480 * i );
	}

	numButtons = Math.ceil( numPics * 480 / WINDOW_WIDTH );
	var moveWidth = ( numPics * 480 - WINDOW_WIDTH ) / ( numButtons - 1 );

	var barContainer = $( '<div/>', { id : 'barContainer' } ).appendTo( box );


	var barLine = $( '<div/>', { id : 'barLine' } ).appendTo( barContainer );
	var barBall = $( '<div/>', { id : 'barBall' } ).appendTo( barContainer );
	var percentageText = $( '<div/>', { id : 'percentageText' } ).append( '0%' ).appendTo( barContainer );
	for( var i=0; i<numButtons; ++i ) {
		var button = $( '<button/>', { class : 'CrystalButton' } ).css( { left : parseInt( barContainer.css('left')) + barContainer.width()+i*30 + 20, top : 398 } ).appendTo( box );
		button.attr( 'index', i );
		button.click( function( event ) {
			var index = this.getAttribute( 'index' );
			var targetLeft = -moveWidth * index;
			imageContainer.animate( { left : -moveWidth * index }, { speed : 700, step : function() {
				var movingLeft = parseInt( imageContainer.css( 'left' ) );
				var percentage = Math.round( Math.abs( movingLeft / ( numPics * 480 - WINDOW_WIDTH ) ) * 100 ) ;
				percentageText.html( percentage + '%' );
			} } );
			var targetLeftOfBall = 5 + 470 * Math.abs( targetLeft / ( numPics * 480 - WINDOW_WIDTH ) );
			barBall.animate( { left : targetLeftOfBall }, 700 );
			percentageText.animate( { left : targetLeftOfBall }, 680 );
		} );
	}

	barBall.mousedown( function() {
		$( 'body' ).mousemove( function( event ) {
			console.log( event.pageX );
			var targetLeft = event.pageX - 225;
			if( targetLeft < 5 ) {
				targetLeft = 5;
			}
			if( targetLeft > 470 ) {
				targetLeft = 470;
			}
			barBall.css( 'left', targetLeft );
			var percentage = Math.round( targetLeft / 470 * 100 );
			if( percentage > 100 ) {
				// percentage = 100;
			}
			imageContainer.css( 'left',  -targetLeft / 470 * ( numPics * 480 - WINDOW_WIDTH ) );
			percentageText.css( 'left', targetLeft );
			percentageText.html( percentage + '%' );
		} );

		$( 'body' ).mouseup( function() {
			$( 'body' ).unbind();
		} );
	} )
	$( window ).resize( function() {

	} );

} );

