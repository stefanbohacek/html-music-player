fetch( '/tracklist.json' ).then( function( response ){ 
	return response.json();
} ).then( function( trackList ){

  console.log( 'trackList', trackList );

  let player = document.querySelector( '#player' );
  let html = '<ul id="player" class="d-none list-group mt-5 mb-5">';

  for ( let i = 0; i < trackList.length; i++ ){
    let htmlButtons = `
        <button type="button" class="btn btn-dark track-control track-control-play" data-track-id="${ i+1 }">Play</button>
        <button type="button" class="btn btn-dark track-control track-control-stop" data-track-id="${ i+1 }">Stop</button>  
    `;

    /* Uncomment the line below to add a download button to each song. */
    // htmlButtons += `<a href="${ trackList[i].url }" target="_blank" class="btn btn-dark" data-track-id="${ i+1 }">Download</a>`;

    html += `
    <li class="list-group-item pt-4 pb-4 track" id="track-${ i+1 }">
      <p class="fs-4">${ trackList[i].title }</p>
      <div class="audio">
        <audio id="track-${ i+1 }">
          <source src="${ trackList[i].url }" />
        </audio>
      </div>
      <div class="btn-group mt-3" role="group" aria-label="Basic example">
        ${ htmlButtons }
      </div>
      <progress id="progress-track-${ i+1 }" class="track-progress mt-2 w-100 d-none" value="0" max="100">0</progress>
    </li>
    `  
  }

  player.outerHTML = html + '</ul>';
  player = document.querySelector( '#player' );

  let tracks = player.querySelectorAll( '.track' );
  let audioElements = player.querySelectorAll( 'audio' );
  let progressBars = player.querySelectorAll( 'progress' );

  function hideProgressBars(){
    for ( let i = 0; i < progressBars.length; i++ ){
      progressBars[i].classList.add('d-none');
    }
  }
  
  function stopTheMusic(){
    hideProgressBars();
    for ( let i = 0; i < audioElements.length; i++ ){
      audioElements[i].pause();
    }
  }
  

  for ( let i = 0; i < tracks.length; i++ ){
    let track = tracks[i].querySelector( 'audio' );

    tracks[i].querySelector( '.track-control-play' ).addEventListener( 'click', function(){
      stopTheMusic();
      progressBars[i].classList.remove('d-none');
      track.currentTime = 0;
      track.play();
    }, false);
    
    track.addEventListener( 'timeupdate', function(){
      progressBars[i].value = 100 * ( this.currentTime / this.duration );
    }, false);

    tracks[i].querySelector( '.track-control-stop' ).addEventListener( 'click', function(){
      stopTheMusic();
    }, false);
    
    progressBars[i].addEventListener( 'click', function( ev ){
      const progressValueClicked = ev.offsetX * this.max / this.offsetWidth;
      track.currentTime = ( track.duration / 100 * progressValueClicked );
    }, false);   
  }

  player.classList.remove( 'd-none' )
});




