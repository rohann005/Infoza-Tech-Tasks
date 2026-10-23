

const root = document.documentElement;                      
const themeButtons = document.querySelectorAll(".swatch");   

function setTheme(name) {

  root.setAttribute("data-theme", name);


  themeButtons.forEach(function (button) {
    button.classList.toggle("active", button.dataset.theme === name);
  });

  try {
    localStorage.setItem("theme", name);
  } catch (error) {}
}

let startTheme = null;
try {
  startTheme = localStorage.getItem("theme");
} catch (error) {}

if (!startTheme) {
  const deviceIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  startTheme = deviceIsDark ? "react" : "mongo";
}

setTheme(startTheme);


themeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setTheme(button.dataset.theme);
  });
});



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


function showEndpoint(name) {
 
  tabButtons.forEach(function (button) {
    button.classList.toggle("active", button.dataset.endpoint === name);
  });

  urlLine.textContent = "GET /api/rohan/" + name + "   200 OK";

  
  output.textContent = JSON.stringify(profileData[name], null, 2);
}


tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    showEndpoint(button.dataset.endpoint);
  });
});


showEndpoint("me");
