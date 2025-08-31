// Minimal JavaScript for AI Data Engineer Portfolio

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Show More Projects Functionality
const showMoreProjectsBtn = document.getElementById('showMoreProjects');
const hiddenProjects = document.querySelectorAll('.project-hidden');

if (showMoreProjectsBtn) {
    showMoreProjectsBtn.addEventListener('click', () => {
        hiddenProjects.forEach(project => {
            project.classList.remove('project-hidden');
        });
        showMoreProjectsBtn.style.display = 'none';
    });
}

// Show More Skills Functionality
const showMoreSkillsBtn = document.getElementById('showMoreSkills');
const hiddenSkills = document.querySelectorAll('.skill-hidden');

if (showMoreSkillsBtn) {
    showMoreSkillsBtn.addEventListener('click', () => {
        hiddenSkills.forEach(skill => {
            skill.classList.remove('skill-hidden');
        });
        showMoreSkillsBtn.style.display = 'none';
    });
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Change button text to show loading
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('🎉 Message sent successfully! I\'ll get back to you soon!');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Funny popup for form submission failure
        const funnyMessages = [
            "🤖 Oops! My AI assistant seems to be having a coffee break. Please try again!",
            "🦄 The unicorn delivering your message got lost in the cloud. Try again?",
            "🐛 A bug ate your message! (Not really, but something went wrong. Try again!)",
            "🚀 Your message tried to reach the moon but came back. Let's try again!",
            "🎭 The form is being dramatic today. Please try again!",
            "🍕 Your message got distracted by pizza. Try sending it again!",
            "🌈 The rainbow bridge to my inbox is temporarily closed. Try again!",
            "🎪 The circus is in town and your message joined the show. Try again!"
        ];
        
        const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        alert(randomMessage);
    } finally {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});
