<p align="center">
    <h1 align="center">GAMEBOY</h1>
</p>
<p align="center">
    <em>Game On, Anytime, Anywhere—Play Free, Play Now!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/ShahSau/gameboy?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/ShahSau/gameboy?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/ShahSau/gameboy?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/ShahSau/gameboy?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
       <img src="https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white" alt="nextjs">
	<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
       <img src="https://img.shields.io/badge/framer_motion-ffca28?style=flat&logo=framer&logoColor=%23ffffff&color=%237178f6" alt="framer-motion">

  
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running gameboy](#-running-gameboy)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview

Welcome to Gameboy, a dynamic and immersive free-to-play gaming platform info webapp built with cutting-edge technologies including JavaScript, Next.js, React, and Framer Motion. Our app is designed to deliver a seamless gaming experience, offering a diverse selection of games that are accessible anytime, anywhere.

Leveraging the power of Next.js for server-side rendering and React for a responsive and interactive user interface, Gameboy ensures that users enjoy fast load times and smooth gameplay. Framer Motion adds an extra layer of engagement, with fluid animations and transitions that bring the gaming experience to life.

Whether you're a casual gamer or a dedicated player, Gameboy provides an exciting and user-friendly environment where fun is just a click away. Join us and dive into a world of endless entertainment—no downloads, no hassle, just pure gaming pleasure!

---


##  Repository Structure

```sh
└── gameboy/
    ├── LICENSE
    ├── README.md
    ├── app
    │   ├── api
    │   │   └── fetchApi.js
    │   ├── favicon.ico
    │   ├── filter
    │   │   └── page.jsx
    │   ├── game
    │   │   └── [id]
    │   │       └── page.jsx
    │   ├── globals.css
    │   ├── layout.jsx
    │   ├── page.jsx
    │   ├── page.module.css
    │   └── search
    │       └── page.jsx
    ├── components
    │   ├── Bar.jsx
    │   ├── Card.jsx
    │   ├── Carousels.jsx
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── Input.jsx
    │   ├── Layout.jsx
    │   ├── MostPlayed.jsx
    │   ├── Navbar.jsx
    │   ├── RecentlyAdded.jsx
    │   ├── Recommendations.jsx
    │   └── Section.jsx
    ├── jest.config.js
    ├── jsconfig.json
    ├── next.config.js
    ├── package-lock.json
    ├── package.json
    ├── providers
    │   └── chakra-ui.provider.jsx
    ├── public
    │   ├── next.svg
    │   └── vercel.svg
    └── utils
        └── filterOptions.js
```

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:


* **nextjs**: `version 13.4.10`
* **react**: `version 18.2.0`

###  Installation

1. Clone the gameboy repository:

```sh
git clone https://github.com/ShahSau/gameboy
```

2. Change to the project directory:

```sh
cd gameboy
```

3. Install the dependencies:

```sh
npm install
```

###  Running gameboy

Use the following command to run gameboy:

```sh
npm run dev
```

---

##  License

This project is protected under the MIT License. For more details, refer to the [LICENSE](https://github.com/ShahSau/turbo?tab=MIT-1-ov-file#readme) file.

---

##  Acknowledgments

* [rapidapi](https://rapidapi.com/digiwalls/api/free-to-play-games-database)

[**Return**](#-quick-links)

---
