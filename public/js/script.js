// ─────────────────────────────────────────────────────────────────────────────
// WANDERLUST – Main JavaScript
// ─────────────────────────────────────────────────────────────────────────────

// ── Bootstrap form validation ──
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  forms.forEach(form => {
    form.addEventListener("submit", e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
})();

// ── Auto-dismiss toasts ──
document.querySelectorAll(".toast.show").forEach(toastEl => {
  setTimeout(() => {
    toastEl.classList.remove("show");
    toastEl.style.opacity = "0";
    toastEl.style.transition = "opacity 0.4s ease";
  }, 4000);
});

// ── Back to top button ──
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("visible", window.scrollY > 400);
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Tax toggle (index page) ──
const taxToggle = document.getElementById("taxToggle");
if (taxToggle) {
  taxToggle.addEventListener("change", function () {
    document.querySelectorAll(".tax-info").forEach(el =>
      el.classList.toggle("d-none", !this.checked)
    );
  });
}

// ── Wishlist form click isolation (prevent card navigation) ──
document.querySelectorAll(".wishlist-form").forEach(form => {
  form.addEventListener("click", e => e.stopPropagation());
});

// ── Image preview on new/edit listing form ──
const imageInput = document.getElementById("imageInput");
if (imageInput) {
  imageInput.addEventListener("change", function () {
    const preview = document.getElementById("imagePreview");
    if (!preview) return;
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
}