
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle()
  initNavigation()
  initTypingEffect()
  initScrollAnimations()
  initSkillBars()
  initWorkFilter()
  initContactForm()
  initSmoothScroll()
})


function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = document.getElementById("theme-icon")
  const body = document.body


  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)


  updateThemeIcon(currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)


    themeToggle.style.transform = "translateY(-50%) scale(0.9)"
    setTimeout(() => {
      themeToggle.style.transform = "translateY(-50%) scale(1)"
    }, 150)
  })

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun"
    } else {
      themeIcon.className = "fas fa-moon"
    }
  }
}


function initNavigation() {
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")


  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Active link highlighting on scroll
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Typing effect for home section
function initTypingEffect() {
  const typingText = document.querySelector(".typing-text")
  const words = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"]
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeEffect() {
    const currentWord = words[wordIndex]

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 100 : 150

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      wordIndex = (wordIndex + 1) % words.length
      typeSpeed = 500 // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed)
  }

  typeEffect()
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add animation classes and observe elements
  const animateElements = document.querySelectorAll(".timeline-item, .work-item, .experience-item, .skill-item")

  animateElements.forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target
          const width = skillBar.getAttribute("data-width")
          skillBar.style.width = width
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => {
    skillObserver.observe(bar)
  })
}

// Work filter functionality
function initWorkFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const workItems = document.querySelectorAll(".work-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      workItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// Contact form functionality
function initContactForm() {
  const form = document.getElementById("contactForm")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const subjectInput = document.getElementById("subject")
  const messageInput = document.getElementById("message")

  // Form validation
  function validateForm() {
    let isValid = true

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = ""
    })

    // Name validation
    if (nameInput.value.trim() === "") {
      document.getElementById("nameError").textContent = "Name is required"
      isValid = false
    } else if (nameInput.value.trim().length < 2) {
      document.getElementById("nameError").textContent = "Name must be at least 2 characters"
      isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailInput.value.trim() === "") {
      document.getElementById("emailError").textContent = "Email is required"
      isValid = false
    } else if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById("emailError").textContent = "Please enter a valid email"
      isValid = false
    }

    // Subject validation
    if (subjectInput.value.trim() === "") {
      document.getElementById("subjectError").textContent = "Subject is required"
      isValid = false
    }

    // Message validation
    if (messageInput.value.trim() === "") {
      document.getElementById("messageError").textContent = "Message is required"
      isValid = false
    } else if (messageInput.value.trim().length < 10) {
      document.getElementById("messageError").textContent = "Message must be at least 10 characters"
      isValid = false
    }

    return isValid
  }

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Show loading state
      const submitBtn = form.querySelector(".submit-btn")
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      // Simulate form submission (replace with actual form submission logic)
      setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.")
        form.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    }
  })

  // Real-time validation
  ;[nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    input.addEventListener("blur", validateForm)
  })
}

// Smooth scroll functionality
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Parallax effect for home section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const homeSection = document.querySelector(".home")
  const rate = scrolled * -0.5

  if (homeSection) {
    homeSection.style.transform = `translateY(${rate}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Utility function for debouncing
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Add any scroll-based functionality here
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)
