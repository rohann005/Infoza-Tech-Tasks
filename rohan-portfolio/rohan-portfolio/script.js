/* =====================================================
   PART 1: THEME SWITCHER
   ===================================================== */

const root = document.documentElement;                       // the <html> tag
const themeButtons = document.querySelectorAll(".swatch");   // the 4 coloured circles

// Change the theme and remember it
function setTheme(name) {
  // style.css reads this attribute to pick the colours
  root.setAttribute("data-theme", name);

  // Highlight the matching circle
  themeButtons.forEach(function (button) {
    button.classList.toggle("active", button.dataset.theme === name);
  });

  // Save the choice in the browser (wrapped in try in case saving is blocked)
  try {
    localStorage.setItem("theme", name);
  } catch (error) {}
}

// Pick the starting theme: saved choice, or dark/light based on the device
let startTheme = null;
try {
  startTheme = localStorage.getItem("theme");
} catch (error) {}

if (!startTheme) {
  const deviceIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  startTheme = deviceIsDark ? "react" : "mongo";
}

setTheme(startTheme);

// Change theme when a circle is clicked
themeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setTheme(button.dataset.theme);
  });
});

/* =====================================================
   PART 2: PROFILE BOX (fake API)
   Edit the data below to change what the box shows.
   ===================================================== */

const profileData = {
  me: {
    role: "Full-stack developer",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    location: "Faridabad, Haryana",
    status: "Open to first role or internship"
  },
  skills: {
    frontend: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT"],
    database: ["MongoDB", "Mongoose"],
    tools: ["Git", "GitHub", "Postman"]
  },
  education: [
    { degree: "BCA", school: "Maharishi Dayanand University", years: "2024-2027" },
    { level: "Class 12", school: "Bohra Public School (CBSE)", year: 2024 }
  ],
  contact: {
    email: "rohan971189@gmail.com",
    github: "rohann005",
    linkedin: "rohankumar005"
  }
};

const tabButtons = document.querySelectorAll(".api-tabs button");
const urlLine = document.getElementById("api-url");
const output = document.getElementById("api-output");

// Show one section of the data in the box
function showEndpoint(name) {
  // Highlight the selected tab
  tabButtons.forEach(function (button) {
    button.classList.toggle("active", button.dataset.endpoint === name);
  });

  urlLine.textContent = "GET /api/rohan/" + name + "   200 OK";

  // JSON.stringify turns the data into neat text (2 = indent with 2 spaces)
  output.textContent = JSON.stringify(profileData[name], null, 2);
}

// Show a section when its tab is clicked
tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    showEndpoint(button.dataset.endpoint);
  });
});

// Start with the first tab
showEndpoint("me");
