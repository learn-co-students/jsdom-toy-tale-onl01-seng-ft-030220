
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;
let divCollect = document.querySelector("#toy-collection")



function getToys(){
  return fetch("http://localhost:3000/toys")
    .then(res => res.json())
  }

  function postToy(toy_data) {
    fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': "application/json"
        },
        body: JSON.stringify({
          "name": toy_data.name.value,
          "image": toy_data.image.value,
          "likes": 0
  
        })
      })
      .then(res => res.json())
      .then((obj_toy) => {
        let new_toy = renderToys(obj_toy)
        divCollect.append(new_toy)
      })
  }





function renderToys(toy){
  let h2 = document.createElement("h2")
  h2.innerText = toy.name 

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
    toyFormContainer.addEventListener("submit", e => {
      e.preventDefault()
      postToy(e.target)
    })
  } else {
    toyFormContainer.style.display = "none";
  }
});

getToys()
 .then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })