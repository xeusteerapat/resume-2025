// Resume JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
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
    }, 100); // Small delay to ensure content is rendered

    // Add click-to-copy functionality for email
    const emailLink = document.querySelector('.email a');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(function() {
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
