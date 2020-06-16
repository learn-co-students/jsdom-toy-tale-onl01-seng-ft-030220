let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  loadToggler();

  getToys();



  // event handler for posting filled toy form data to the toy collection
  let newToyForm = document.getElementsByClassName("add-toy-form")[0];

  newToyForm.addEventListener("submit", (e) => {

    e.preventDefault();
    let name = e.target.children["name"].value;
    let image = e.target.children["image"].value
    let likes = 0;

    let formData = {
      name,
      image,
      likes
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch('http://localhost:3000/toys', configObj)
      .then(res => res.json())
      .then(data => {
        const toyCollection = document.getElementById('toy-collection');
        const newToy = document.createElement("div");
        toyCollection.innerHTML += `<div class="card">
          <h2>${data["name"]}</h2>
          <img src="${data["image"]}" class="toy-avatar" />
          <p>${data["likes"]}</p>
          <button class="like-btn">Like <3</button>
        </div>`
      })
      .catch(err => alert(err.message));
  });
});


function loadToggler() {
  // setup toggler for adding new toys
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
};

function getToys() {
  // GET request fetches toys in db.json
  fetch(`http://localhost:3000/toys`)
    .then(res => res.json())
    .then(data => {
      const toyCollection = document.getElementById('toy-collection');
      for(const toy of data) {
        toyCollection.appendChild(createToyCard(toy))
      };
    })
    .catch(err => alert(err.message));
};

function createToyCard(toyData) {
  const toyCard = document.createElement("div");
  toyCard.setAttribute("class", "card")

  let h2 = document.createElement("h2")
  h2.innerText = toyData["name"]
  toyCard.appendChild(h2);

  let img = document.createElement("img");
  img.setAttribute("class", "toy-avatar")
  img.src = toyData["image"];
  toyCard.appendChild(img);

  let likes = document.createElement("p");
  likes.innerText = toyData["likes"]
  toyCard.appendChild(likes);

  let likeBtn = document.createElement("button");
  likeBtn.setAttribute("class", "like-btn");
  likeBtn.innerText = "Like <3"
  toyCard.appendChild(likeBtn);

  loadLikeListener(toyCard);
  return toyCard;
};

function loadLikeListener(toyCard) {
  let likeBtn = toyCard.children[3]
  likeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/toys/:id`, {
      method: "PATCH",
      headers: {
        "Content-Tpye": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": e.target.previousElementSibling.innerText++
      })
    })
  })

  // button.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   let likes = 0;
  // });
}
