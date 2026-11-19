document.addEventListener("DOMContentLoaded", function () {

    // إنشاء شريط تقدم القراءة
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    document.body.appendChild(progressBar);

    // إنشاء زر العودة إلى الأعلى
    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.innerHTML = "↑";
    topButton.setAttribute("aria-label", "العودة إلى أعلى الصفحة");
    document.body.appendChild(topButton);

    // تحديث شريط التقدم وإظهار زر العودة
    window.addEventListener("scroll", function () {

        const scrollTop = window.scrollY;
        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = pageHeight > 0
            ? (scrollTop / pageHeight) * 100
            : 0;

        progressBar.style.width = progress + "%";

        if (scrollTop > 300) {
            topButton.classList.add("visible");
        } else {
            topButton.classList.remove("visible");
        }

        // تحديد القسم الحالي في القائمة
        document.querySelectorAll("section[id]").forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute("id");

            const navLink = document.querySelector(
                '.nav-links a[href="#' + sectionId + '"]'
            );

            if (navLink) {
                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    document.querySelectorAll(".nav-links a").forEach(function (link) {
                        link.classList.remove("active");
                    });

                    navLink.classList.add("active");
                }
            }
        });
    });

    // العودة إلى أعلى الصفحة
    topButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // التنقل السلس بين الأقسام
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // إظهار العناصر عند الوصول إليها
    const animatedElements = document.querySelectorAll(
        ".section, .card, .target-box, .about-box"
    );

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(function (element) {
        element.classList.add("hidden");
        revealObserver.observe(element);
    });

});
