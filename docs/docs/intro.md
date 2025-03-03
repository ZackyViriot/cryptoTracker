---
sidebar_position: 1
---

# Introduction to CryptoTrack

CryptoTrack is a real-time cryptocurrency price tracking application built with Next.js and modern web technologies. It provides users with live price updates for major cryptocurrencies in a clean, responsive interface.

## Key Features

- **Real-time Price Updates**: Automatically refreshes cryptocurrency prices every 30 seconds
- **Search Functionality**: Filter cryptocurrencies by name or symbol
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **Frontend Framework**: Next.js with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **API**: CoinGecko
- **Documentation**: Docusaurus

## Project Structure

```
crypto-tracker/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main dashboard component
│   │   └── store/
│   │       └── store.ts      # Zustand store configuration
├── docs/                     # Documentation (Docusaurus)
└── README.md                 # Project overview
```

## Getting Started

Visit our [Setup Guide](./setup) to get started with CryptoTrack.

# Tutorial Intro

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
