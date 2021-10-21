<h1>Budget Tracker - PWA</h1>
  
  <h2>Description</h2>
  
  Budget Tracker is a simple Progressive Web Application (PWA) that one can use track their expenses. The application is hosted via Heroku and communicates with a MongoDB database via Express & mongoose. The application also has the ability to store POST request data made by the user if the application goes offline / is slow to respond in the browser using IndexedDB. The data in the IndexedDB store is added to the MongoDB database when the client's browser regains stable connection. Then, the data is removed from the IndexedDB store. Furthermore, this application takes advantage of the browser's Cache API utilizing service workers. The service workers will capture the css, js, and html assets of the application and cache them upon the application loading. Then, if the client is ever to lose connection to the server's assets, the cached assets are used instead. 

  <h2>Website</h2>
  Website Link: <a href="https://enigmatic-retreat-32803.herokuapp.com/" target="_blank">https://enigmatic-retreat-32803.herokuapp.com/</a>

  <h2 id="questions">Questions</h2>
  
  <p> 
  Made by: AshisPatel<br />
  Github Profile: https://github.com/AshisPatel<br />
  </p>Email: ashis.n.patel@gmail.com<br />Please send me an email with any comments, questons, or concerns!
  <h2>End Note - A Thank You To The Reader</h2>

  Hello! I hope that you are having a wonderful day / afternoon / evening / weird late-night hours, and if you are not, hopefully the fun fact and gif at the end of this section can help! Prior to that, please allow me to rant. This week was about setting up a PWA, and the technology required to do so. Things all seem to be quite 'boiler-plate' which is good and all when things work, but when things don't work... it's a much more *interesting* problem. However, the fact that the browser itself has so much utility is incredibly neat! And it also makes a lot more sense why certain websites work when there's connection disruptions and others do not. Any who, please enjoy the fun fact and gif below, take care friends! (^^)b

  **Fun Fact:** The green code in The Matrix was actually created from symbols in the code designer’s wife’s sushi cookbook. So if you really want to hack into the main frame, just go to the cooking isle of Barnes & Noble. 

  *I don't know why I find this so funny*

  ![Dagger catches random person by suprise](https://github.com/AshisPatel/Budget-Tracker-PWA/blob/main/repo-assets/gifs/bad_luck.gif)
  