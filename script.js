let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
});

window.onscroll = () => {
    let top = window.scrollY;
    
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            let activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
    
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        let targetId = link.getAttribute('href');
        let targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let img = document.querySelector('.home-img img');
    if (img) {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

async function fetchGithubProjects() {
  const username = "eduardoesn";
  const portfolioContainer = document.getElementById("portfolio-repositorios");

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    );
    const repos = await response.json();

    portfolioContainer.innerHTML = "";

    if (repos.length === 0) {
      portfolioContainer.innerHTML =
        "<p>Nenhum projeto encontrado no GitHub.</p>";
      return;
    }

    repos.forEach((repo) => {
      if (repo.fork) {
        return;
      }

      const card = document.createElement("a");
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.classList.add("portfolio-card");

      let projectImage = "./img/icones/default-icon.png";

      if (repo.language) {
        switch (repo.language.toLowerCase()) {
          case "javascript":
            projectImage = "./img/icones/js.png";
            break;
          case "python":
            projectImage = "./img/icones/python.png";
            break;
          case "java":
            projectImage = "./img/icones/java.png";
            break;
          case "html":
          case "css":
            projectImage = "./img/icones/html.png";
            break;
        }
      }

      card.innerHTML = `
                <img src="${projectImage}" alt="Imagem do projeto ${
        repo.name
      }" class="portfolio-imagem">
                <div class="caixa-textos-projeto">
                    <h3 class="info-portfolio">${repo.name.replace(
                      /-/g,
                      " "
                    )}</h3>
                    <p class="paragrafo-portfolio">${
                      repo.description || ""
                    }</p>
                </div>
            `;
      portfolioContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao buscar projetos do GitHub:", error);
    portfolioContainer.innerHTML =
      "<p>Erro ao carregar projetos. Tente novamente mais tarde.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchGithubProjects);