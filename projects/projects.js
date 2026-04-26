import { fetchJSON, renderProjects } from "../global.js";

const projects = await fetchJSON(new URL("../lib/projects.json", import.meta.url));
const projectsContainer = document.querySelector(".projects");
const projectsTitle = document.querySelector(".projects-title");

if (projectsTitle) {
    projectsTitle.textContent = `${projects.length} Projects`;
}

renderProjects(projects, projectsContainer, "h2");
