const input = document.querySelector(".container__input");
const complete = document.querySelector(".container__autocomplete");
const api = document.querySelector(".container__card");
let repositories;

input.addEventListener(
  "input",
  debounce(() => {
    complete.textContent = "";
    const txtInput = input.value.trim();
    if (txtInput !== "") {
      searchUsers(txtInput)
        .then((repData) => {
          repositories = repData;
          listOfRepositories(repData);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }, 700)
);

async function searchUsers(query) {
  const users = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=5`
  );
  const data = await users.json();
  console.log(data);
  return data.items;
}

function listOfRepositories(repositories) {
  repositories.forEach((reposit) => {
    let listRepositories = document.createElement("li");
    listRepositories.textContent = reposit.name;
    complete.appendChild(listRepositories);
  });
}

complete.addEventListener("click", (e) => {
  let listItems = e.target;
  let personalInfo = listItems.textContent;
  const reposit = repositories.find((reposit) => reposit.name === personalInfo);
  if (reposit) {
    getUsersInformation(reposit);
    input.value = "";
    complete.innerHTML = "";
  }
});

function getUsersInformation(reposit) {
  let usersInfo = document.createElement("li");
  let repData = {
    name: reposit.name,
    owner: reposit.owner.login,
    stars: reposit.stargazers_count,
  };

  let usersName = document.createElement("div");
  usersName.textContent = `Name: ${repData.name}`;
  let usersOwner = document.createElement("div");
  usersOwner.textContent = `Owner: ${reposit.owner.login}`;
  let usersStars = document.createElement("div");
  usersStars.textContent = `Stars: ${reposit.stargazers_count}`;

  let btn = createButton(usersInfo);
  usersInfo.appendChild(usersName);
  usersInfo.appendChild(usersOwner);
  usersInfo.appendChild(usersStars);
  usersInfo.appendChild(btn);
  api.appendChild(usersInfo);
}

function createButton(usersInfo) {
  let btn = document.createElement("button");
  btn.className = "close_btn";
  btn.addEventListener("click", () => {
    usersInfo.remove();
  });
  return btn;
}