AG Grid Data Management Dashboard
A full-stack React + Node.js + MongoDB data management dashboard for electric vehicle data, featuring:

- React + Vite + TypeScript frontend

- AG Grid for powerful, customizable tables

- Material UI (MUI) for consistent, modern styling

- Node.js + Express backend API

- MongoDB (Atlas or local) for storage

- Fully featured: pagination, filtering, search, view details, delete, and more

 Features
Generic, reusable DataGrid (AG Grid) supporting:

- Column actions (view, delete)

- Backend-powered search & filter (with debounce)

- Server-side pagination

- View detailed item info on a separate page

- Modern, accessible UI (MUI)

- MongoDB data seeding from CSV

- Modular, scalable code structure

- Full TypeScript support

Quickstart
1. Clone the Repo
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Setup Backend

cd backend
cp .env.example .env   # Fill in your MongoDB URI and port
npm install
npm run seed           # (Seeds DB from provided CSV)
npm run dev            # Starts backend on localhost:5001 by default

3. Setup Frontend

cd frontend
cp .env.example .env   # Edit VITE_API_URL if backend port changed
npm install
npm run dev            # Starts Vite dev server

4. Visit in Browser
- Frontend: http://localhost:5173 (default)

- API: http://localhost:5001/api/vehicles

Development
- Linting: npm run lint

- Formatting: npm run format

- Type-check: npm run typecheck

Scripts
- npm run dev – start dev server

- npm run build – build for production

- npm run seed – seed MongoDB with CSV data (backend only)



