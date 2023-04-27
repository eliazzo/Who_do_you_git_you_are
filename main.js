import { Octokit, App } from "https://cdn.skypack.dev/octokit";

const octokit = new Octokit({
  auth:  "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",
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

const fac27Logins = ["simonryrie", "carlthedev", "camelPhonso", "cameochoquer", "FomasTreeman", "hanleymark", "malcolmwilson8", "Taha-hassan-git", "zakkariyaa", "eliazzo", "skarzcode", "shahryarrr", "ivanmauricio", "sofer"]
for(const login of fac27Logins){
  getUser(login)
}
// getUser("simonryrie");
// getUser("carlthedev");
// getUser("camelPhonso");
// getUser("cameochoquer");
// getUser("FomasTreeman");
// getUser("hanleymark");
// getUser("malcolmwilson8");
// getUser("Taha-hassan-git");
// getUser("zakkariyaa");
// getUser("eliazzo");
// getUser("skarzcode");
// getUser("shahryarrr");
// getUser("ivanmauricio");
// getUser("sofer");
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


const repoNameArr = [];
listOrgRepos.data.forEach((repo) => {
  repoNameArr.push(repo.name)
})


const repoSizeArr = []
listOrgRepos.data.forEach((repo) => {
  repoSizeArr.push(repo.size);
})







// Get repo contributors
// await octokit.request('GET /repos/{owner}/{repo}/contributors', {
//   owner: 'fac27',
//   repo: 'agency-website',
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28'
//   }
// })

// Add event listener to dropdown on change
facDropdown.addEventListener("change", function getChosenRepo() {
  let chosenRepo = facDropdown.value
  console.log(chosenRepo)

  const card = document.getElementById("card");
  const clonedCard = card.cloneNode(true);
  clonedCard.classList.remove('display-none');
  clonedCard.classList.add("stack-s")
  const cardContainer = document.getElementById("repo-cards");
  cardContainer.appendChild(clonedCard)
 
  requestIssues(chosenRepo, clonedCard)

  requestCommits(chosenRepo, clonedCard)
  })

// Get repo issues and display on page
async function requestIssues(name, location) {
  const requestIssue = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "fac27",
    repo: name,
  })

  const requestIssueData = requestIssue.data
  const issueHeading = document.createElement("h2");
  issueHeading.innerText = "Open issues: ";
  location.appendChild(issueHeading);

  console.log(requestIssueData)
  requestIssueData.forEach((issue) => {
    const displayIssues = document.createElement("p");
    displayIssues.innerText = issue.title;
    location.appendChild(displayIssues);
  })
}
// END

// Get commit history and append to page
async function requestCommits(repo, location) {
  const requestCommit = await octokit.request("GET /repos/{owner}/{repo}/commits", {
  owner: "fac27",
  repo: repo,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
  });
  
  const requestCommitData = requestCommit.data
  const commitHeading = document.createElement("h2");
  commitHeading.innerText = "Commit history: "
  location.appendChild(commitHeading);

  requestCommitData.forEach((item) => {
    const displayCommits = document.createElement("p");
    displayCommits.innerText = item.author.login + " : " + item.commit.message;
    location.appendChild(displayCommits)
    })
  }
// END

// Get followers and push to array ro create chart

const followerArr = [];
const numberOfFollowersArr = [];

async function getFollowers(login){
  const getFollowers = await octokit.request('GET /users/{username}/followers', {
    username: login,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  // console.log(getFollowers.data)
  // getFollowers.data.forEach(repo => console.log(repo.length))

  const followerData = getFollowers.data
  followerArr.push(followerData)
}



for(const login of fac27Logins){
getFollowers(login)
}


function createQuanitityArr() {
    followerArr.forEach(arr => numberOfFollowersArr.push(arr.length))
    console.log(numberOfFollowersArr)
  }

setTimeout(createQuanitityArr, 2000)


// Chart.js

const xValuesSmall = repoNameArr.filter(name => name !== 'Agency-Website-A-C' && name !== 'AgencyWebsite' && name !== 'HereHear');
const yValuesSmall = repoSizeArr.filter(value => value <= 9000)

const xValuesLarge = ['Agency-Website-A-C', 'AgencyWebsite', 'HereHear'];
const yValuesLarge = repoSizeArr.filter(value => value >= 9000);

console.log(yValuesLarge)

const barColors = ["#20BF55", "#F52F57","#5448C8","#F3752B","#363635"];

new Chart("repoSizeLarge", {
  type: "bar",
  data: {
    labels: xValuesLarge,
    datasets: [{
      label: "Top 3 largest repos",
      backgroundColor: barColors,
      data: yValuesLarge
    }]
  },
});



new Chart("repoSizeSmall", {
  type: "bar",
  data: {
    labels: xValuesSmall,
    datasets: [{
      label: "All other repo sizes",
      backgroundColor: barColors,
      data: yValuesSmall
    }]
  },
});



function createPie() {
  console.log(numberOfFollowersArr)

new Chart("follower-chart", {
  type: "pie",
  data: {
    labels: fac27Logins,
    datasets: [{
      label: "Fac27 Followers",
      backgroundColor: barColors,
      data: numberOfFollowersArr
    }]
  },
});

}

setTimeout(createPie, 5000)

