let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", (event)=> {
        event.preventDefault();
        addNewToy(event.target);
      })
    } else {
      toyForm.style.display = "none";
    }
  });
});


//  API GET REQ
const getToys = () => {
  const url = "http://localhost:3000/toys";
  return fetch(url).then(
    response =>{ return response.json()}
  )
}

//  DOM MANIPULATION
const renderToys = (toy) => {
  let toyCard = document.createElement("div");
  toyCard.setAttribute("class", "card");
  
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;
  
  let img = document.createElement("img");
  img.setAttribute("src", toy.image)
  img.setAttribute("class", "toy-avatar")
  
  let likes = document.createElement("p");
  likes.innerText = toy.likes;
  
  let button = document.createElement("button");
  button.setAttribute("class", "like-btn")
  button.setAttribute("id", toy.id)
  button.innerText = "Like <3"
  button.addEventListener("click", (event)=>{
    let likesCounter = parseInt(event.target.previousSibling.innerText)+1;
    console.log(event.target.id)
    const url = `http://localhost:3000/toys/${event.target.id}`;
    fetch(url,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likesCounter
      })
    }).then(response=>{
      response.json()
    }).then(likeObj => {
      e.target.previousElementSibling.innerText = `${likesCounter} likes`
    })})
  
  toyCard.append(h2, img, likes, button)
  
  let toyContainer = document.querySelector("#toy-collection");
  toyContainer.append(toyCard);
  
}

//  POOL CALL
getToys().then((toys)=>{toys.forEach(toy=>{renderToys(toy)})})




// add new toy

const addNewToy = (newToy) => {
  const url = "http://localhost:3000/toys";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": newToy.name.value,
      "image": newToy.image.value,
      "likes": 0
    })
  }).then(
    response=> {
      renderToys(response.json())
    }
  )
}