$(document).ready(function(){

    // Now access it with that path
    var path_to_the_webservice = "lorem.json";

	$('#runner').runner({
        countdown: true,
        startAt: 59000,
        milliseconds: false,
        stopAt: 0
    }).on('runnerFinish', function(eventObject, info) {
        $('.bodyLower .toggleBtn').click();
        $('.navbar-inverse').toggleClass('on');
    });;
	$('.toggle-time').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('on');
    	$('#runner').runner('toggle');
	});

    $('.navbar-brand').click(function(){
        
        $('.navbar-inverse').toggleClass('on');

        if( $('.navbar-inverse').hasClass('on') == true ) {

            // Start the timer
            $('#runner').runner('start');
            
            // Get JSON and randomly display stuff
            $.getJSON(path_to_the_webservice, function(data){
                var randomnumber=Math.floor(Math.random()*data.length);
                $('#text1').text(data[randomnumber].text1);
                $('#person').attr('src', data[randomnumber].picture);
            });
            $.getJSON(path_to_the_webservice, function(data){
                var randomnumber=Math.floor(Math.random()*data.length);
                $('#text2').text(data[randomnumber].text2);
            });
            $.getJSON(path_to_the_webservice, function(data){
                var randomnumber=Math.floor(Math.random()*data.length);
                $('#text3').text(data[randomnumber].text3);
            });
            $.getJSON(path_to_the_webservice, function(data){
                var randomnumber=Math.floor(Math.random()*data.length);
                $('#text4').text(data[randomnumber].text4);
            });
        } else {
            // Start the timer
            $('#runner').runner('reset', true);
            
        }

        // Play or Stop Metronome
        $('.bodyLower .toggleBtn').click();

    });
});