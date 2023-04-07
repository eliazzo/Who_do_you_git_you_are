import { Octokit, App } from "https://cdn.skypack.dev/octokit";

const octokit = new Octokit({
  auth:,
});

// Get fac27 user data and append on page load
async function getUser(username, getUser) {
  getUser = await octokit.request("GET /users/{username}", {
    username: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  displayUser(username, getUser);
}

function displayUser(username, getUser) {
  const teamGrid = document.getElementById("team-grid");
  const userDiv = document.createElement("div");
  userDiv.setAttribute("id", username);
  userDiv.style.width = "300px";
  userDiv.innerText = getUser.data.login;
  const userImg = document.createElement("img");
  userImg.style.width = "inherit";
  userImg.setAttribute("src", getUser.data.avatar_url);
  userDiv.appendChild(userImg);
  teamGrid.appendChild(userDiv);
}

getUser("simonryrie");
getUser("carlthedev");
getUser("camelPhonso");
getUser("cameochoquer");
getUser("FomasTreeman");
getUser("hanleymark");
getUser("malcolmwilson8");
getUser("Taha-hassan-git");
getUser("zakkariyaa");
getUser("eliazzo");
getUser("ivanmauricio");
getUser("sofer");
// END

// Get Fac27 repos and display in dropdown
const listOrgRepos = await octokit.request("GET /orgs/{org}/repos", {
  org: "fac27",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const facRepoArr = [];
facRepoArr.push(listOrgRepos.data);
const repoNames = facRepoArr[0].map((repo) => repo.name);
const facDropdown = document.getElementById("fac27-dropdown");
repoNames.forEach((repo) => {
  const option = document.createElement("option");
  option.setAttribute("value", repo)
  option.text = repo;
  facDropdown.add(option);
});
// END

const repoData = document.querySelector("output");

// Get repo issues and display on page
async function requestIssues(name, requestIssue) {
  requestIssue = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "fac27",
    repo: name,
  });
}

function displayIssues(requestIssue, cloneCard) {
  const displayIssues = document.createElement("p");
  // displayIssues.classList.add("stack-below");
  displayIssues.innerText = "Open issues: " + requestIssue.data[0].title;
  cloneCard.appendChild(displayIssues);
}
// END

// Get repo contributors

await octokit.request('GET /repos/{owner}/{repo}/contributors', {
  owner: 'fac27',
  repo: 'agency-website',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

// dropDown values

const repoDropdown = document.getElementById("fac27-dropdown");

repoDropdown.addEventListener("change", function getChosenRepo() {
  let chosenRepo = repoDropdown.value
  console.log(chosenRepo)

  const card = document.getElementById("card");
  const cloneCard = card.cloneNode(true);
  const cardContainer = document.getElementById("repo-cards");
  cardContainer.appendChild(cloneCard)
 
  requestIssues(requestIssue, chosenRepo)
  displayIssues(requestIssue, cloneCard)
  requestCommits(chosenRepo)
  })



// Get commit history and append to page
async function requestCommits(repo, requestCommit) {
  requestCommit = await octokit.request("GET /repos/{owner}/{repo}/commits", {
  owner: "fac27",
  repo: repo,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
  console.log(requestCommit)
  displayCommits(requestCommit)
}

function displayCommits(requestCommit) {
  const displayCommits = document.createElement("p");
  const requestCommitData = requestCommit.data
  requestCommitData.filter((item) => {
    displayCommits.innerText = "Commit history: \n" + item.author.login + " : " + item.commit.message;
    repoData.appendChild(displayCommits)
    })
}




