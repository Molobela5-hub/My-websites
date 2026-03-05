document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const message = document.getElementById("form-message");

    if (!form || !message) return;

    // On submit: build WhatsApp message from form fields and open chat
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name') || 'No name';
        const email = formData.get('email') || 'No email';
        const business = formData.get('business') || 'Not provided';
        const project = formData.get('message') || '';

        const phone = '27607568573'; // international format without +

        const textLines = [
            `Hello, my name is ${name}.`,
            `Email: ${email}`,
            `Business: ${business}`,
            `Project details: ${project}`
        ];

        const text = textLines.join('\n');
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

        // Show temporary message then open WhatsApp
        message.style.display = "block";
        message.scrollIntoView({ behavior: "smooth" });

        // Open WhatsApp in a new tab/window
        window.open(waUrl, '_blank');
    });
});
