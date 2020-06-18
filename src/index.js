let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")
  fetchToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = form.name.value
        const image = form.image.value
        console.log(name)
        console.log(image)
        submitData(name,image)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function fetchToys() {
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  
  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      renderToys(object)
    })
    .catch(function(error) {
      alert("ERROR!");
      console.log(error.message);
    })
}

function renderToys(toys) {
  toys.forEach(function(toy) {
    postToy(toyHTML(toy))
  })
}

function postToy(toy) {
  const toyCollection = document.getElementById("toy-collection")
  toyCollection.appendChild(toy)
}

function toyHTML(toy) {
  const div = document.createElement("div")
  const header = document.createElement("h2")
  const image = document.createElement("img")
  const paragraph = document.createElement("p")
  const button = document.createElement("button")
  toy.className = "card"
  header.innerHTML = toy.name
  image.src = toy.image
  image.className = "toy-avatar"
  paragraph.innerHTML = toy.likes + " Likes"
  button.className = "like-btn"
  button.innerHTML = "Like <3"
  div.appendChild(header)
  div.appendChild(image)
  div.appendChild(paragraph)
  div.appendChild(button)
  return div
}

function submitData(name, image) {
  let formData = {
    name: name,
    image: image,
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  
  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      console.log(object)
    })
    .catch(function(error) {
      alert("ERROR!");
      fetchToys()
    })
}
