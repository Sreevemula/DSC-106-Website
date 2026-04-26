function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/"
    : "/DSC-106-Website/";

const pages = [
    { url: "", title: "Home" },
    { url: "projects/", title: "Projects" },
    { url: "contact/", title: "Contact" },
    { url: "resume/", title: "Resume" },
    { url: "https://github.com/Sreevemula", title: "GitHub Profile" },
];

function buildNav() {
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Main navigation");

    for (const page of pages) {
        let url = page.url;

        if (!url.startsWith("http")) {
            url = BASE_PATH + url;
        }

        const link = document.createElement("a");
        link.href = url;
        link.textContent = page.title;

        link.classList.toggle(
            "current",
            link.host === location.host && link.pathname === location.pathname,
        );

        if (link.host !== location.host) {
            link.target = "_blank";
            link.rel = "noreferrer";
        }

        nav.append(link);
    }

    document.body.prepend(nav);
}

function buildThemeSwitcher() {
    document.body.insertAdjacentHTML(
        "afterbegin",
        `
            <label class="color-scheme">
                Theme:
                <select>
                    <option value="light dark">Automatic</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </label>
        `,
    );

    const select = document.querySelector(".color-scheme select");

    if ("colorScheme" in localStorage) {
        document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
        select.value = localStorage.colorScheme;
    }

    select.addEventListener("input", (event) => {
        const { value } = event.target;
        console.log("color scheme changed to", value);
        document.documentElement.style.setProperty("color-scheme", value);
        localStorage.colorScheme = value;
    });
}

export async function fetchJSON(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching or parsing JSON data:", error);
        return [];
    }
}

export function renderProjects(projects, containerElement, headingLevel = "h2") {
    if (!containerElement) {
        console.error("renderProjects could not find a valid container element.");
        return;
    }

    const validHeading = /^h[1-6]$/.test(headingLevel) ? headingLevel : "h2";
    const projectList = Array.isArray(projects) ? projects : [];

    containerElement.innerHTML = "";

    if (projectList.length === 0) {
        containerElement.innerHTML = "<p>No projects available yet.</p>";
        return;
    }

    for (const project of projectList) {
        const article = document.createElement("article");
        article.className = "project-card";

        const heading = document.createElement(validHeading);
        heading.textContent = project.title ?? "Untitled Project";

        const img = document.createElement("img");
        img.src = project.image ?? "https://dsc106.com/labs/lab02/images/empty.svg";
        img.alt = project.title ?? "";
        img.loading = "lazy";

        const description = document.createElement("p");
        description.textContent = project.description ?? "Description coming soon.";

        article.append(heading, img);

        if (project.year) {
            const year = document.createElement("p");
            year.className = "project-meta";
            year.textContent = `Year: ${project.year}`;
            article.append(year);
        }

        article.append(description);
        containerElement.appendChild(article);
    }
}

export async function fetchGitHubData(username) {
    return fetchJSON(`https://api.github.com/users/${username}`);
}

buildThemeSwitcher();
buildNav();

window.$$ = $$;
