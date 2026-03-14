document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const message = document.getElementById("form-message");

    if (form && message) {
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
    }

    // Sticky CTA: allow drag-and-drop repositioning
    const sticky = document.getElementById("stickyContact");
    const stickyLink = sticky ? sticky.querySelector("a") : null;
    const storageKey = "stickyContactPosition";

    if (!sticky || !stickyLink) return;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let activePointerId = null;

    sticky.style.touchAction = "none";

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function applyPosition(left, top) {
        sticky.style.left = `${left}px`;
        sticky.style.top = `${top}px`;
        sticky.style.right = "auto";
        sticky.style.bottom = "auto";
    }

    function savePosition() {
        const rect = sticky.getBoundingClientRect();
        localStorage.setItem(storageKey, JSON.stringify({ left: rect.left, top: rect.top }));
    }

    function restorePosition() {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return;

        try {
            const saved = JSON.parse(raw);
            if (typeof saved.left !== "number" || typeof saved.top !== "number") return;

            const maxLeft = window.innerWidth - sticky.offsetWidth;
            const maxTop = window.innerHeight - sticky.offsetHeight;
            const nextLeft = clamp(saved.left, 0, Math.max(maxLeft, 0));
            const nextTop = clamp(saved.top, 0, Math.max(maxTop, 0));

            applyPosition(nextLeft, nextTop);
        } catch (_error) {
            // Ignore invalid saved position values
        }
    }

    restorePosition();

    function startDrag(clientX, clientY) {
        const rect = sticky.getBoundingClientRect();
        dragging = true;
        moved = false;
        startX = clientX;
        startY = clientY;
        startLeft = rect.left;
        startTop = rect.top;
        sticky.classList.add("dragging");
    }

    function moveDrag(clientX, clientY) {
        if (!dragging) return;

        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        if (!moved && Math.hypot(deltaX, deltaY) > 4) {
            moved = true;
        }

        if (!moved) return;

        const maxLeft = window.innerWidth - sticky.offsetWidth;
        const maxTop = window.innerHeight - sticky.offsetHeight;
        const nextLeft = clamp(startLeft + deltaX, 0, Math.max(maxLeft, 0));
        const nextTop = clamp(startTop + deltaY, 0, Math.max(maxTop, 0));

        applyPosition(nextLeft, nextTop);
    }

    function stopDrag() {
        if (!dragging) return;

        dragging = false;
        activePointerId = null;
        sticky.classList.remove("dragging");

        if (moved) {
            savePosition();
        }
    }

    // Pointer events path (modern browsers)
    sticky.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        event.preventDefault();
        activePointerId = event.pointerId;
        startDrag(event.clientX, event.clientY);
    });

    window.addEventListener("pointermove", (event) => {
        if (!dragging) return;
        if (activePointerId !== null && event.pointerId !== activePointerId) return;
        event.preventDefault();
        moveDrag(event.clientX, event.clientY);
    }, { passive: false });

    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);

    // Mouse fallback
    sticky.addEventListener("mousedown", (event) => {
        if (window.PointerEvent) return;
        if (event.button !== 0) return;
        event.preventDefault();
        startDrag(event.clientX, event.clientY);
    });

    window.addEventListener("mousemove", (event) => {
        if (!dragging) return;
        moveDrag(event.clientX, event.clientY);
    });

    window.addEventListener("mouseup", stopDrag);

    // Touch fallback
    sticky.addEventListener("touchstart", (event) => {
        if (window.PointerEvent) return;
        const touch = event.touches[0];
        if (!touch) return;
        event.preventDefault();
        startDrag(touch.clientX, touch.clientY);
    }, { passive: false });

    window.addEventListener("touchmove", (event) => {
        if (!dragging) return;
        const touch = event.touches[0];
        if (!touch) return;
        event.preventDefault();
        moveDrag(touch.clientX, touch.clientY);
    }, { passive: false });

    window.addEventListener("touchend", stopDrag);
    window.addEventListener("touchcancel", stopDrag);

    stickyLink.addEventListener("click", (event) => {
        // Prevent opening WhatsApp if user just dragged the button
        if (moved) {
            event.preventDefault();
            moved = false;
        }
    });

    window.addEventListener("resize", () => {
        if (sticky.style.left === "" || sticky.style.top === "") return;

        const rect = sticky.getBoundingClientRect();
        const maxLeft = window.innerWidth - sticky.offsetWidth;
        const maxTop = window.innerHeight - sticky.offsetHeight;
        const nextLeft = clamp(rect.left, 0, Math.max(maxLeft, 0));
        const nextTop = clamp(rect.top, 0, Math.max(maxTop, 0));
        applyPosition(nextLeft, nextTop);
    });
});
