// Resume JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load resume data from JSON
    loadResumeData();
    
    // Add smooth scrolling for any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add print functionality
    function addPrintButton() {
        const printButton = document.createElement('button');
        printButton.textContent = 'Print Resume';
        printButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #E0FFFF;
            border: 1px solid #000;
            padding: 10px 15px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 1000;
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }

    // Add print button only on screen (not in print mode)
    if (window.matchMedia) {
        const mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (!mql.matches) {
                addPrintButton();
            }
        });
        
        if (!mediaQueryList.matches) {
            addPrintButton();
        }
    } else {
        addPrintButton();
    }

    // Add hover effects for better interactivity
    setTimeout(() => {
        const companyNames = document.querySelectorAll('.company-name');
        companyNames.forEach(company => {
            company.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#B8E6E6';
            });
            
            company.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#E0FFFF';
            });
        });
    }, 1000); // Wait for content to load
});

// Function to load resume data from JSON
async function loadResumeData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        
        // Load all sections
        loadHeader(data);
        loadIntroduction(data.introduction);
        loadSkills(data.skills);
        loadExperiences(data.experiences);
        loadEducation(data.educations);
        loadCertifications(data.achievements);
        
    } catch (error) {
        console.error('Error loading resume data:', error);
        // Show error message
        document.getElementById('resume-name').textContent = 'Error loading resume';
    }
}

// Function to load header information
function loadHeader(data) {
    const nameElement = document.getElementById('resume-name');
    if (nameElement) {
        nameElement.textContent = data.name.toUpperCase();
    }
    
    const contactElement = document.getElementById('contact-info');
    if (contactElement && data.contacts) {
        contactElement.innerHTML = data.contacts.map(contact => {
            if (contact.type === 'Email') {
                return `<span class="email"><a href="${contact.link}" aria-label="Email Teerapat Prommarak">${contact.link.replace('mailto:', '')}</a></span>`;
            } else if (contact.type.includes('Bangkok')) {
                return `<span class="location">${contact.type}</span>`;
            } else {
                return `<span class="${contact.type.toLowerCase()}"><a href="${contact.link}" target="_blank" aria-label="Visit Teerapat Prommarak's ${contact.type} profile">${contact.type} Profile</a></span>`;
            }
        }).join('<span class="separator">|</span>');
    }
}

// Function to load introduction
function loadIntroduction(introduction) {
    const introElement = document.getElementById('introduction-text');
    if (introElement) {
        introElement.textContent = introduction;
    }
}

// Function to load skills into the skills list
function loadSkills(skills) {
    const skillsContainer = document.getElementById('skills-list');
    if (skillsContainer && skills) {
        skillsContainer.innerHTML = Object.entries(skills).map(([category, skillArray]) => `
            <div class="skill-category">
                <h3 class="skill-category-title">${category}:</h3>
                <span class="skill-items-text">${skillArray.join(', ')}.</span>
            </div>
        `).join('');
    }
}

// Function to load experiences
function loadExperiences(experiences) {
    const experiencesContainer = document.getElementById('experiences-container');
    if (experiencesContainer && experiences) {
        experiencesContainer.innerHTML = experiences.map((experience, index) => `
            <div class="experience">
                <div class="company-header">
                    <h3 class="company-name">${experience.company.toUpperCase()}</h3>
                    <div class="position-date">
                        <span class="position">${experience.position}</span>
                        <span class="date">${experience.dates}</span>
                    </div>
                </div>
                <div class="key-achievements">
                    <h4 class="achievements-title">Key Achievements:</h4>
                    <ul class="achievements-list">
                        ${experience.responsibilities.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ${index < experiences.length - 1 ? '<hr class="divider">' : ''}
        `).join('');
    }
}

// Function to load education
function loadEducation(educations) {
    const educationContainer = document.getElementById('education-container');
    if (educationContainer && educations) {
        educationContainer.innerHTML = educations.map(education => `
            <div class="education-item">
                <div class="education-header">
                    <span class="degree">${education.degree}</span>
                    <span class="education-date">${education.graduationYear}</span>
                </div>
                <p class="university">${education.university}</p>
            </div>
        `).join('');
    }
}

// Function to load certifications
function loadCertifications(achievements) {
    const certificationsContainer = document.getElementById('certifications-container');
    if (certificationsContainer && achievements) {
        certificationsContainer.innerHTML = achievements.map(achievement => `
            <div class="cert-item">
                <a href="${achievement.link}" target="_blank" class="cert-title" aria-label="View ${achievement.title} certificate">${achievement.title}</a>
            </div>
        `).join('');
    }
}