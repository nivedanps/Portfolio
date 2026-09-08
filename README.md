# ✨ Nivedan P S - Modern 3D Developer Portfolio

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

A responsive, high-performance personal portfolio website built using **React 19**, **TypeScript**, **Three.js / React Three Fiber**, and **Tailwind CSS**. Featuring interactive 3D particle animations, sleek dark/light mode theming, and an interactive presentation of projects, skills, courses, certifications, and educational background.

---

## 🌟 Highlights & Features

- 🌌 **Interactive 3D Particle Background**: Immersive background built with `@react-three/fiber`, `@react-three/drei`, and `Three.js`.
- 🌓 **Dynamic Dark / Light Mode**: Seamless theme switching with saved local preferences.
- 📱 **Fully Responsive Design**: Optimized across mobile phones, tablets, laptops, and ultra-wide displays.
- 🚀 **Featured Projects Showcase**: Real-world projects including autonomous multi-agent systems, analytics feedback portals, and database management solutions.
- 🛠️ **Technical Arsenal & Skills**: Categorized breakdown of programming languages, developer tools, AI frameworks, and soft skills.
- 🎓 **Education & Certifications Timeline**: Detailed academic milestones (MIT Mysuru, Sadvidya, BVB) alongside verified certifications and hackathon achievements (*Innovostava Runner, Hackverse2025*).
- 📄 **Direct Resume Download**: Integrated CV download mechanism.
- 📬 **Interactive Contact Portal**: Direct communication channels with social profiles, email, and location.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/), PostCSS, Custom CSS Keyframe Animations |
| **3D & Visual Effects** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [maath](https://github.com/pmndrs/maath) |
| **Icons & UI Assets** | [Lucide React](https://lucide.dev/) |

---

## 📂 Project Structure

```bash
nivedan-p-s-portfolio/
├── components/
│   ├── AboutSection.tsx           # Bio, background & quick career stats
│   ├── Background3D.tsx           # Interactive 3D particle Canvas
│   ├── CertificationsSection.tsx   # Courses, certifications, hackathons & interests
│   ├── ContactSection.tsx         # Interactive contact form & reach-out details
│   ├── EducationSection.tsx       # Timeline of academic qualifications & CGPA
│   ├── Footer.tsx                 # Footer with copyright and quick navigation
│   ├── Hero.tsx                   # Hero banner, typewriter name animation & CV download
│   ├── Navbar.tsx                 # Glassmorphic header with navigation and theme switch
│   ├── ProjectsSection.tsx        # 3D tilt project cards with GitHub links
│   └── SkillsSection.tsx          # Categorized technical skill cards
├── public/
│   ├── profile.jpg                # Profile avatar
│   └── resume.pdf                 # Latest downloadable resume
├── constants.tsx                  # Centralized content, projects, education & skills data
├── types.ts                       # TypeScript interfaces and data models
├── App.tsx                        # Main application layout and active section tracker
├── index.css                      # Global styles, animations & design tokens
├── tailwind.config.js             # Tailwind CSS configuration
└── vite.config.ts                 # Vite bundler configuration
```

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version `v18.0.0` or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nivedanps/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 👨‍💻 About Me

**Nivedan P S**
- 🎓 Final Year B.E. in Computer Science & Engineering at **Maharaja Institute of Technology, Mysuru**
- 💡 Passionate about Full-Stack Web Development, AI Agent Systems, and Cloud Technologies
- 📍 Mysuru, Karnataka, India
- 🌐 LinkedIn: [linkedin.com/in/nivedanps](https://www.linkedin.com/in/nivedanps)
- 🐙 GitHub: [github.com/nivedanps](https://github.com/nivedanps)
- ✉️ Email: [nivedanps1234@gmail.com](mailto:nivedanps1234@gmail.com)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). Feel free to explore and customize it for your own portfolio!
