const githubForm = document.getElementById("github-form");
const githubInput = document.getElementById("githubname");
const lastUsersAllClear = document.getElementById("clear-last-users");

githubForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const search = document.getElementById("githubname").value;

  fetch("https://api.github.com/users/" + search)
    .then((result) => result.json())
    .then((data) => {
      const profileBody = document.getElementById("profile");
      const row = `<div class="row">
        <div class="col-md-4">
          <a href="https://github.com/users/${data.login}" target="_blank">
            <img class="img-fluid img-thumbnail rounded mb-2 full-width" src="${data.avatar_url}" />
          </a>
        </div>
        <div class="col-md-8">
          <h5 id="fullName">
            <strong>${data.name}</strong> (${data.bio})
          </h5>

          <hr />

          <a href="" class="btn btn-secondary" target="_blank">
            Takipçi <span class="badge badge-light">${data.followers}</span>
          </a>

          <a href="" class="btn btn-info" target="_blank">
            Takip Edilen <span class="badge badge-light">${data.following}</span>
          </a>

          <a href="" class="btn btn-danger" target="_blank">
            Repolar <span class="badge badge-light">${data.public_repos}</span>
          </a>

          <hr />

          <ul class="list-group">
            <li class="list-group-item borderzero">
              <img src="assets/img/user.png" width="30px" /> <span id="company">${data.company}</span>
            </li>

            <li class="list-group-item borderzero">
              <img src="assets/img/location.png" width="30px" />
              <span id="location">${data.location} </span>
            </li>

            <li class="list-group-item borderzero">
              <img src="assets/img/email.png" width="30px" />
              <span id="mail">${data.email}</span>
            </li>
          </ul>
        </div>
      </div>`;
      profileBody.innerHTML = row;
    });

  fetch("https://api.github.com/users/" + search + "/repos")
    .then((result) => result.json())
    .then((data) => {
      const reposBody = document.getElementById("repos");
      reposBody.innerHTML = "";
      data.forEach(function (data) {
        const body = `<div class="row">
            <div class="col-md-6">
              <a href="${data.html_url}" target="_blank"
                id="repoName">${data.name}</a>
            </div>
            <div class="col-md-6 text-right">
              <button class="btn btn-secondary mb-3">
                Starlar <span class="badge badge-light" id="repoStar">${data.stargazers_count}</span>
              </button>
              <button class="btn btn-info mb-3">
                Forklar <span class="badge badge-light" id="repoFork">${data.forks_count}</span>
              </button>
            </div>
          </div>`;
        reposBody.insertAdjacentHTML("beforeend", body);
      });
    });
});
// LocalStorage - Last Users
const addHtml = (user) => {
  const lastUsers = document.getElementById("last-users");
  const lastSaveUsers = `<li class="list-group-item searched-li" id="lastUsersId">${user.text}</li>`;
  lastUsers.insertAdjacentHTML("beforeend", lastSaveUsers);
};

const startConf = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    localStorage.setItem("users", JSON.stringify([]));
  } else {
    users.forEach((user) => {
      addHtml(user);
    });
  }
};

startConf();

const addUser = (e) => {
  userText = githubInput.value;

  const user = {
    text: userText,
  };

  const users = JSON.parse(localStorage.getItem("users"));
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  addHtml(user);

  githubForm.reset();
};

githubForm.addEventListener("submit", addUser);

lastUsersAllClear.addEventListener("click", function (e) {
  localStorage.clear();
  window.location.reload();
});

