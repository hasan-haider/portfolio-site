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

// Animate progress bars when they come into view
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            // Get the target width from the inline style attribute
            const targetWidth = bar.getAttribute('style')?.match(/width:\s*(\d+%)/)?.[1] || '0%';
            
            // Animate to target width
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.classList.add('animated');
            }, 200);
        }
    });
};

// Initialize progress bars
const initializeProgressBars = () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        // Ensure all bars start at 0 width
        bar.style.width = '0%';
    });
    
    // Trigger animation after a short delay
    setTimeout(animateProgressBars, 500);
};

// Call on page load and scroll
window.addEventListener('load', initializeProgressBars);
window.addEventListener('scroll', animateProgressBars);

// Show More Projects Functionality
const showMoreProjectsBtn = document.getElementById('showMoreProjects');
const projectCards = document.querySelectorAll('.project-card');

if (showMoreProjectsBtn) {
    showMoreProjectsBtn.addEventListener('click', () => {
        // Show all project cards by removing the CSS rule that hides them
        projectCards.forEach(card => {
            card.style.display = 'block';
        });
        showMoreProjectsBtn.style.display = 'none';
    });
}

// Show More Skills Functionality
const showMoreSkillsBtn = document.getElementById('showMoreSkills');
const skillCategories = document.querySelectorAll('.skill-category');
const hiddenSkills = document.querySelectorAll('.skill-hidden');

if (showMoreSkillsBtn) {
    showMoreSkillsBtn.addEventListener('click', () => {
        // Show all skill categories
        skillCategories.forEach(category => {
            category.style.display = 'block';
        });
        // Show all hidden skills within categories
        hiddenSkills.forEach(skill => {
            skill.classList.remove('skill-hidden');
        });
        showMoreSkillsBtn.style.display = 'none';
        // Re-animate progress bars for newly shown skills
        setTimeout(animateProgressBars, 100);
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
