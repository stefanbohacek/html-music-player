fetch('/tracklist.json').then(function(response){ 
	return response.json();
}).then(trackList => {

  let player = document.querySelector('#player');
  let html = '<ul id="player" class="d-none list-group mt-5 mb-5">';

  for (let i = 0; i < trackList.length; i++){
    let htmlButtons = `
        <button type="button" class="btn btn-dark track-control track-control-play" data-track-id="${ i+1 }">Play</button>
        <button type="button" class="btn btn-dark track-control track-control-stop" data-track-id="${ i+1 }">Stop</button>  
    `;

    html += `
    <li class="list-group-item pt-4 pb-4 track" id="track-${ i+1 }">
      <p class="fs-4">${ trackList[i].title }</p>
      <div class="audio">
        <audio controls id="track-${ i+1 }">
          <source src="${ trackList[i].url }" />
        </audio>
      </div>
    </li>
    `  
  }

  player.outerHTML = html + '</ul>';
  player = document.querySelector('#player');

  document.addEventListener('play', ev => {
      const audios = document.getElementsByTagName('audio');
      for(let i = 0, len = audios.length; i < len;i++){
          if(audios[i] != ev.target){
              audios[i].pause();
          }
      }
  }, true);
  
  player.classList.remove('d-none')
});
