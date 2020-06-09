let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection')

  const addToyForm = document.querySelector('.add-toy-form')
  const nameField = addToyForm.querySelector('input[name="name"]')
  const imageField = addToyForm.querySelector('input[name="image"]')

  const displayUpdatedToyLikes = (toyData) => {
    const toyDiv = document.getElementById(`toy-${toyData.id}`)
    const likesElem = toyDiv.querySelector('p')
    likesElem.innerHTML = `${toyData.likes} ${toyData.likes === 1 ? 'Like' : 'Likes'} `
  }

  const updateToyLikes = (toyId, likes) => {
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({ 
        likes: likes 
      })
    })
    .then(resp => resp.json())
    .then(data => {
      displayUpdatedToyLikes(data)
    })
  }

  const addLikeCallback = (e) => {
    const parentDiv = e.target.parentNode

    const currentLikes = parseInt(parentDiv.querySelector('p').innerHTML.split(' ')[0])
    const toyId = parentDiv.id.split('-')[1]

    const newLikes = currentLikes + 1 
    updateToyLikes(toyId, newLikes)
  }

  const makeAndAddToy = (toyData) => {
    // toyCollection.innerHTML += `
    //   <div id="toy-${toyData.id}" class="card">
    //     <h2>${toyData.name}</h2>
    //     <img src="${toyData.image}" class="toy-avatar" />
    //     <p>${toyData.likes} Likes </p>
    //     <button class="like-btn">Like <3</button>
    //   </div>
    // `
    const cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    cardDiv.id = `toy-${toyData.id}`
    cardDiv.innerHTML = `
      <h2>${toyData.name}</h2>
      <img src="${toyData.image}" class="toy-avatar" />
      <p>${toyData.likes} Likes </p>
    `

    const likeButton = document.createElement('button')
    likeButton.innerHTML = 'Like <3'
    likeButton.className = 'like-btn'
    likeButton.addEventListener('click', addLikeCallback)

    cardDiv.appendChild(likeButton)
    toyCollection.appendChild(cardDiv)
  }
  
  const loadToys = () => {
    return fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(data => {
        data.forEach(toyData => makeAndAddToy(toyData))
      })
  }

  const persistToy = (name, imageUrl) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        image: imageUrl,
        likes: 0
      })
    })
      .then(resp => resp.json())
      .then(data => makeAndAddToy(data))
  }

  addToyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = nameField.value
    const imageUrl = imageField.value
    if (name && imageUrl) {
      persistToy(name, imageUrl)
    }
    nameField.value = ''
    imageField.value = ''
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  loadToys()
});
