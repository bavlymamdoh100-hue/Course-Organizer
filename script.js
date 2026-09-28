document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelectorAll("#year");
  year.forEach(el => el.textContent = new Date().getFullYear());

  const courseForm = document.querySelector("#course-form");
  if (courseForm) {
    courseForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const course = {
        name: document.querySelector("#courseName").value.trim(),
        instructor: document.querySelector("#instructor").value.trim(),
        credits: document.querySelector("#credits").value,
        notes: document.querySelector("#notes").value.trim() || "No notes added."
      };

      const saved = JSON.parse(localStorage.getItem("courseflowCourses") || "[]");
      saved.push(course);
      localStorage.setItem("courseflowCourses", JSON.stringify(saved));

      const message = document.querySelector("#form-message");
      message.textContent = "Course added successfully. Redirecting to My Courses...";

      courseForm.reset();
      setTimeout(() => {
        window.location.href = "my_courses.html";
      }, 900);
    });
  }

  const courseList = document.querySelector("#course-list");
  if (courseList) {
    const saved = JSON.parse(localStorage.getItem("courseflowCourses") || "[]");

    saved.forEach(course => {
      const card = document.createElement("article");
      card.className = "course-card";
      card.innerHTML = `
        <div class="course-top">
          <span class="course-tag">NEW COURSE</span>
          <span>${escapeHTML(course.credits)} CH</span>
        </div>
        <h3>${escapeHTML(course.name)}</h3>
        <p class="instructor">${escapeHTML(course.instructor)}</p>
        <p>${escapeHTML(course.notes)}</p>
      `;
      courseList.appendChild(card);
    });

    const count = document.querySelector("#course-count");
    if (count) count.textContent = `${5 + saved.length} courses`;
  }

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.querySelector("#contact-message");
      message.textContent = "Thanks! Your message has been received in this demo.";
      contactForm.reset();
    });
  }
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}
