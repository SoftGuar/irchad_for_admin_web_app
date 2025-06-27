# irchad_for_admin_web_app

This is the **admin interface** of the project — a navigation and monitoring system for visually impaired users.  
This frontend integrates multiple backend services and provides the administrative tools needed to manage the system.

---

## Tech Stack

- **Frontend Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: JWT-based (via Auth & Account services)

---

## Configuration

1. **Copy the environment file**
   ```bash
   cp .env.example .env
   ```

2. **Make sure the following backend services are running**:
   - `auth-service`
   - `account-management-service`
   - `gateway`
   - `admin-service`
   - `monitoring-service`
   - `cartographie-service`
   - `Notification-service`
   - `Analytics-service`
     
---

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---
