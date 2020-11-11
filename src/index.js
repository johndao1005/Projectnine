const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'http://api.lyrics.ovh'

// run other code while function working async
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/sugges/${term}`);
    const data = await res.json();
    showData(data);
}
async function getMoreSong(){
    const res =await fetch('')
}
function getLyric() {
    const res = await fetch(`${apiURL}/vl/${artist}/${songTittle}`)
    const data = await res.json()
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g),
        '<br>';
    result.innerHTML = `<h2><strong>${artist}</strong> -${songTittle}</h2>
        <span>${lyrics}</span>
        `
}

function showData(data) {
    result.innerHTML = `
<ul class="song">
${data.data
.map(
song => `<li>
<span><strong>${song.artitist.name}</strong>- ${song.title}</span>
<button class="btn" data-artist="
${song.artist}" datal-tittle="${song.tittle}">Get lyrics</button>
</li>`)
.join('')
}
</ul>
`
if (data.prev || data.next){
    more.innerHTML  = `
    ${
        data.prev ? `<button class="btn" onclick="getMoreSong('$(data.prev)')">Prev</button>` : ''  
    }
    ${
        data.next ? `<button class="btn" onclick="getMoreSong('$(data.next)')">Next</button>` : ''
    }
    `
    
} else {
    more.innerHTML = ''
}

}

//Event listener
form.addEventListener('submit', e=> {
    //not refresh the whole page
    e.preventDefault()

    const searchTerm = search.value.trim()

    if(!searchTerm) {
        alert('Please type in a search term')
    } else {
        searchSongs(searchTerm);
    }
})

result.addEventListener('click', e=>{
    const clickEl =e.target.value
    if(clickEl.tagName === "BUTTON"){
        const artist = clickEl.getAttribute('data-artist')
        const songTittle = clickEl.getAttribute('data-songTittle')

        getLyric(artist, songTittle)
    }
})