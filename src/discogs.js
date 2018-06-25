export function getDiscogsAlbum(ask) {
  const key = "CkcQiUDczVzwnWytrlqy";
  const secret = "mtTuMzcQhlmSqLvTwSwXvjWoenTiRgiM";
  const discogsSearch = `https://api.discogs.com/database/search?q=${ask}&type=artist&key=${key}&secret=${secret}&per_page=10`;

  const artistArray = [];

  fetch(discogsSearch)
    .then(response => response.json())
    .then(json => artistArray.push(...json.results))
    .then(() => artistArray)
    .catch(error => console.log(error));
  return artistArray;
}
