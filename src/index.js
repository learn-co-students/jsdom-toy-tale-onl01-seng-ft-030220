let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")
  const likeBtn = document.querySelector("#toy-collection")
  fetchToys()
  likeBtn.addEventListener("click", (e) => {
    const targetedClass = e.target.parentElement
    if (targetedClass.className === "toy") {
      const toyID = targetedClass.id
      const updatedLikes = parseInt(targetedClass.querySelector("p").innerHTML.split(" ")[0]) + 1
      addLike(toyID,updatedLikes)
    }
  })
  
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
  div.className = "toy"
  div.id = toy.id
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
      clearForm()
      fetchToys()
    })
    .catch(function(error) {
      alert("ERROR!")
    })
}

function clearForm() {
  const form = document.querySelector(".add-toy-form")
  form.name.value = ""
  form.image.value = ""
  addToy = !addToy
}

function addLike(toyID,updatedLikes) {
  let formData = {
    id: toyID,
    likes: updatedLikes
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  
  fetch(`http://localhost:3000/toys/${toyID}`, configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      clearToys()
      fetchToys()
    })
    .catch(function(error) {
      alert("ERROR!")
    })
}

function clearToys() {
  const toys = document.getElementById("toy-collection")
  toys.innerHTML = ""
}