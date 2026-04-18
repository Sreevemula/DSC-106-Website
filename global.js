console.log("IT'S ALIVE!");

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

buildThemeSwitcher();
buildNav();

window.$$ = $$;
