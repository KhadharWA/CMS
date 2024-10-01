document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the speed, the faster the counter

    const runCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // Using Intersection Observer to trigger the animation only when the section is visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter();
                observer.disconnect(); // Disconnect after triggering once
            }
        });
    }, {
        threshold: 0.6 // Adjust this to when the section should become visible (60% visibility here)
    });

    const successSection = document.querySelector('.success');
    observer.observe(successSection);
});