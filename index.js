import { fetchGitHubData, fetchJSON, renderProjects } from "./global.js";

const projects = await fetchJSON(new URL("./lib/projects.json", import.meta.url));
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector(".projects");

renderProjects(latestProjects, projectsContainer, "h2");

const githubData = await fetchGitHubData("Sreevemula");
const profileStats = document.querySelector("#profile-stats");

if (profileStats && githubData?.login) {
    profileStats.innerHTML = `
        <dl class="github-stats">
            <dt>Followers</dt><dd>${githubData.followers}</dd>
            <dt>Following</dt><dd>${githubData.following}</dd>
            <dt>Public Repos</dt><dd>${githubData.public_repos}</dd>
            <dt>Public Gists</dt><dd>${githubData.public_gists}</dd>
        </dl>
    `;
}
