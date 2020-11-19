function doGet(e) 
{
  var clientId = '';  //put your clientId here
  var clientSecret = '';  //put your clientSecret here

  var url = "https://accounts.spotify.com/api/token";
  var params = {
    method: "post",
    headers: { "Authorization" : "Basic " + Utilities.base64Encode(clientId + ":" + clientSecret) },
    payload: {grant_type: "client_credentials"},
  };
  var res = UrlFetchApp.fetch(url, params);
  Logger.log(res.getContentText())
  
  var obj = JSON.parse(res.getContentText());
  artistInfo = searchSpotify("Eagles",obj.access_token);
  return HtmlService.createHtmlOutput(artistInfo); 
}

function searchSpotify(artist,access_token) 
{
  //searches spotify and returns artist info
  var response = UrlFetchApp.fetch("https://api.spotify.com/v1/search?q=" + artist + "&type=artist", 
  { 
    method: "GET", headers:
    {
      "contentType": "application/json",
      'Authorization': "Bearer " + access_token
     },
  });
  json = response.getContentText();
  var data = JSON.parse(json);   //You will have to sort out the structure - I just dumped the string
  return json;
}