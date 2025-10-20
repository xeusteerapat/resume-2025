// Resume JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load resume data from JSON
    loadResumeData();
    
    // Add smooth scrolling for any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
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
    const companyNames = document.querySelectorAll('.company-name');
    companyNames.forEach(company => {
        company.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#B8E6E6';
        });
        
        company.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#E0FFFF';
        });
    });

    // Add click-to-copy functionality for email
    const emailLink = document.querySelector('.email a');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigator.clipboard.writeText('xeus085@gmail.com').then(function() {
                // Show a temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copied to clipboard!';
                tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: #333;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 12px;
                    z-index: 1001;
                `;
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 2000);
            });
        });
    }
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
    }
}

// Function to load header information
function loadHeader(data) {
    // Load name
    const nameElement = document.getElementById('resume-name');
    if (nameElement) {
        nameElement.textContent = data.name.toUpperCase();
    }
    
    // Load contact info
    const contactElement = document.getElementById('contact-info');
    if (contactElement && data.contacts) {
        const contactItems = data.contacts.map(contact => {
            if (contact.type === 'Email') {
                return `<span class="email"><a href="${contact.link}">${contact.link.replace('mailto:', '')}</a></span>`;
            } else {
                return `<span class="${contact.type.toLowerCase()}"><a href="${contact.link}" target="_blank">${contact.type}</a></span>`;
            }
        });
        contactElement.innerHTML = contactItems.join('<span class="separator">|</span>');
    }
}

// Function to load introduction
function loadIntroduction(introduction) {
    const introElement = document.getElementById('introduction-text');
    if (introElement && introduction) {
        introElement.textContent = introduction;
    }
}

// Function to load skills into the skills list
function loadSkills(skills) {
    const skillsList = document.getElementById('skills-list');
    if (skillsList && skills) {
        skillsList.innerHTML = '';
        
        // Handle both old array format and new object format
        if (Array.isArray(skills)) {
            // Old format - simple array
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });
        } else {
            // New format - categorized object
            Object.entries(skills).forEach(([category, skillArray]) => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'skill-category';
                
                const categoryTitle = document.createElement('h3');
                categoryTitle.className = 'skill-category-title';
                categoryTitle.textContent = category + ':';
                
                const skillsText = document.createElement('span');
                skillsText.className = 'skill-items-text';
                skillsText.textContent = skillArray.join(', ') + '.';
                
                categoryDiv.appendChild(categoryTitle);
                categoryDiv.appendChild(skillsText);
                skillsList.appendChild(categoryDiv);
            });
        }
    }
}

// Function to load experiences
function loadExperiences(experiences) {
    const experiencesContainer = document.getElementById('experiences-container');
    if (experiencesContainer && experiences) {
        experiencesContainer.innerHTML = '';
        
        experiences.forEach((experience, index) => {
            const experienceDiv = document.createElement('div');
            experienceDiv.className = 'experience';
            
            // Use ALL responsibilities as achievements (bullet points)
            const achievements = experience.responsibilities;
            
            experienceDiv.innerHTML = `
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
                        ${achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            experiencesContainer.appendChild(experienceDiv);
            
            // Add divider between experiences (except for the last one)
            if (index < experiences.length - 1) {
                const divider = document.createElement('hr');
                divider.className = 'divider';
                experiencesContainer.appendChild(divider);
            }
        });
    }
}

// Function to load education
function loadEducation(educations) {
    const educationContainer = document.getElementById('education-container');
    if (educationContainer && educations) {
        educationContainer.innerHTML = '';
        
        educations.forEach(education => {
            const educationDiv = document.createElement('div');
            educationDiv.className = 'education-item';
            
            educationDiv.innerHTML = `
                <div class="education-header">
                    <span class="degree">${education.degree}</span>
                    <span class="education-date">${education.graduationYear}</span>
                </div>
                <p class="university">${education.university}</p>
            `;
            
            educationContainer.appendChild(educationDiv);
        });
    }
}

// Function to load certifications
function loadCertifications(achievements) {
    const certificationsContainer = document.getElementById('certifications-container');
    if (certificationsContainer && achievements) {
        certificationsContainer.innerHTML = '';
        
        achievements.forEach(achievement => {
            const certDiv = document.createElement('div');
            certDiv.className = 'cert-item';
            
            certDiv.innerHTML = `
                <a href="${achievement.link}" target="_blank" class="cert-title">${achievement.title}</a>
            `;
            
            certificationsContainer.appendChild(certDiv);
        });
    }
}
