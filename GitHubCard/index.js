/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

function axiosGithub(username){
    axios
        .get(`https://api.github.com/users/${username}`)
        .then(response => {
            console.log(response.data);
            cardProfile(response.data);
            return username;
        })
        .then(username =>{
            axios
                .get(`https://api.github.com/users/${username}/followers`)
                .then(response=>{
                    let friendList = response.data;
                    friendList.forEach((obj)=>{
                        console.log(obj.login);
                            axios
                                .get(`https://api.github.com/users/${obj.login}`)
                                .then(response => {
                                    cardProfile(response.data);
                                })
                    });
                })
                .catch(error=>{
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });

}

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

let cardsDiv = document.querySelector(".cards");

function cardProfile(obj) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    let cardAvatar = document.createElement("img");
    cardAvatar.src = obj.avatar_url;

    let cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    let h3 = document.createElement("h3");
    h3.classList.add("name");
    h3.textContent = obj.name;

    let profileUserN = document.createElement("p");
    profileUserN.classList.add("username");
    profileUserN.textContent = obj.login;

    let profileLocation = document.createElement("p");
    profileLocation.textContent = `Location: ${obj.location}`;

    let profileP = document.createElement("p");
    profileP.textContent = `Profile: ${obj.html_url}`;

    let profileAnchor = document.createElement("a");
    profileAnchor.href = obj.html_url;

    let pFollowers = document.createElement("p");
    pFollowers.textContent = `Followers: ${obj.followers}`;

    let pFollowing = document.createElement("p");
    pFollowing.textContent = `Following: ${obj.following}`;

    let profileBio = document.createElement("p");
    profileBio.textContent = `Bio: ${obj.bio}`;

    cardsDiv.appendChild(cardDiv);

    cardDiv.appendChild(cardAvatar);
    cardDiv.appendChild(cardInfo);

    profileP.appendChild(profileAnchor);

    cardInfo.appendChild(h3);
    cardInfo.appendChild(profileUserN);
    cardInfo.appendChild(profileLocation);
    cardInfo.appendChild(profileP);
    cardInfo.appendChild(pFollowers);
    cardInfo.appendChild(pFollowing);
    cardInfo.appendChild(profileBio);




}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
// console.log(axiosGithub("raajnpatel"));
axiosGithub("raajnpatel");