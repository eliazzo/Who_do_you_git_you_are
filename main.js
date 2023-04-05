import { Octokit, App } from "https://cdn.skypack.dev/octokit";

const octokit = new Octokit({ 
    auth: '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',
  })


// use HTTP GET to see repo issues
async function requestIssues(name) {
const requestIssues = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "fac27",
    repo: name,
  });

const displayIssues = document.createElement("p");
displayIssues.innerText = "Open issues: " + requestIssues.data[0].title;
repoData.appendChild(displayIssues)

}

// List FAC27 repos
const listOrgRepos = await octokit.request('GET /orgs/{org}/repos', {
    org: 'fac27',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

const facRepoArr = []
facRepoArr.push(listOrgRepos.data)

const repoNames = facRepoArr[0].map((repo)=> repo.name);

const facDropdown = document.getElementById("fac27-dropdown");
repoNames.forEach((repo) => {
    const option = document.createElement("option");
    option.text = repo;
    facDropdown.add(option);
})

const dropdownOptions = document.querySelectorAll("option")
// console.log(dropdownOptions)

const searchBtn = document.getElementById("search-repo");
searchBtn.addEventListener("click", () => requestIssues("agency-website"));

const repoData = document.querySelector("output");



// List FAC27 public members
await octokit.request('GET /orgs/{org}/members', {
    org: 'fac27',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
// console.log(fac27Members)

//collaborators
await octokit.request('GET /repos/{owner}/{repo}/collaborators', {
    owner: 'fac27',
    repo: 'agency-website',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })


// List commits

const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: 'fac27',
    repo: 'agency-website',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
//   console.log(commits.data[0].commit)




// Traditional fetch methods
const gitURL = 'https://api.github.com';

fetch(gitURL)
.then(response => response.json())
// .then(data => console.log(data))

// returns a list of possible URLS that you can access from gitHub


const emails = "https://api.github.com/user/emails";

// fetch(emails)
// .then(response => response.json())
// .then(data => console.log(data))

