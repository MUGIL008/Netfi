# 📱 Netfi – Full‑Stack Telecom Recharge Management System

## 🧩 Introduction

In today’s digital-first world, telecom operators and service providers are constantly evolving their online recharge platforms. I built **Netfi** — a full-stack, role-based telecom recharge management system — to address this growing need. Netfi allows **regular users** to explore prepaid and postpaid mobile plans, browse add-on packs, and recharge their numbers. At the same time, **admins** can fully manage telecom plans and add-ons through a secure, intuitive dashboard.

Built using **React.js** for the frontend and **Spring Boot** for the backend, Netfi was designed to be modular, scalable, and responsive. It implements **Role-Based Access Control (RBAC)** to securely control what features are available to each user type. This ensures that sensitive operations like adding or deleting plans are restricted to authorized users only, while end users enjoy a seamless and interactive recharge experience.


---

## 🧩 Executive Summary

Netfi simulates a real-world B2B/B2C telecom platform:

- **Users** explore prepaid/postpaid plans, manage add-ons, place recharges, and receive notifications.
- **Admins** have full CRUD access: can create, edit, and delete plans and add-ons via a dedicated dashboard.

Key features and goals:

- Clean, modular React architecture
- Secure routing with role-based conditional rendering
- Decoupled REST APIs with clean controller → service → repository layer
- Persistent login sessions using `localStorage` 
- Thorough unit and integration testing

---

## 🏗️ Architecture Overview

```

┌─────────┐     Axios     ┌────────────┐     JDBC/JPA     ┌────────┐
│ Browser │ ───────────▶ │ React Frontend │  ─────────▶  │ Spring │
│  Client │               │  (UI + Auth)   │              │ Boot   │
└─────────┘               └────────────┘                  └────────┘
│
MySQL / H2

````

- Frontend communicates via **REST calls** (Axios) with the backend
- Backend uses **Spring Data JPA** with Hibernate ORM over **MySQL** (or H2 in tests)
- Clear separation of concerns ensures maintainability and scalability

---

## ⚙️ Tech Stack

### Frontend

- **React.js** – Functional components with Hooks
- **React Router DOM** – Route management
- **Axios** – HTTP client
- **CSS Modules** – Scoped styling
- **localStorage** – Frontend token/session persistence

### Backend

- **Spring Boot** – RESTful service
- **Spring Data JPA (Hibernate)** – ORM
- **MySQL / H2** – Production/test databases
- **JUnit 5 + MockMvc** – Unit and integration tests
- **Maven/Gradle** – Build tooling

---

## 👥 Roles & Access Control

Two roles defined:

- **User**: browse plans, recharge, view notifications  
- **Admin**: full CRUD for plans/add-ons + all user privileges  

Credential persistence:

```json
{
  "username": "admin_user",
  "userRole": "admin",
  "token": "JWT_or_custom_token"
}
````

The frontend dynamically renders UI like navbars, routes, and dashboards based on `userRole`.

---

## 🔐 Authentication & Session Flow

1. **SignUp** registers the user and sets role.
2. **Login** verifies credentials; on success, stores `{username, userRole, token}` in `localStorage`.
3. `App.jsx` checks `userRole` on load; navigates to appropriate pages.
4. Admin-only routes are gated behind role checks—redirects unauthorized users.

```jsx
{
  userRole === 'admin' ? <AdminNavBar /> : <UserNavBar />
}
```

---

## 🧭 Routing Structure (React)

```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/popularplans" element={<PopularPlans />} />
  <Route path="/addons" element={<Addons />} />
  <Route path="/recharge" element={<Recharge />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/admin/*" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
</Routes>
```

`RequireAdmin` enforces route protection. Non-admins are redirected.

---

## 🗂️ Frontend Project Structure

```
src/
├── App.jsx
├── Login.jsx
├── Signup.jsx
├── PopularPlans.jsx
├── Addons.jsx
├── Recharge.jsx
├── Notifications.jsx
├── components/
│   ├── Plans.jsx
│   ├── AddOnsList.jsx
│   ├── UserAddOnItems.jsx
│   └── admin/
│       ├── AdminNavBar.jsx
│       ├── PrepaidPlans.jsx
│       ├── AddPrepaidPlans.jsx
│       ├── EditPrepaidPlans.jsx
│       ├── PostpaidPlans.jsx
│       ├── AddPostpaidPlans.jsx
│       ├── EditPostpaidPlans.jsx
│       ├── AddOns.jsx
│       ├── AddAddOns.jsx
│       └── EditAddOns.jsx
├── styles/
│   ├── Popularplans.module.css
│   ├── Addon.module.css
│   └── (other CSS Modules)
└── utils/
    └── api.js (Axios defaults & interceptors)
```

### Frontend Highlights

* **Plans.jsx**: reusable plan card
* **AddOnsList.jsx**: renders addon UI
* **Admin components**: full CRUD form logic with validation

---
## 🔌 Backend API Layer
Controller → Service → Repository

### 📁 PlanController.java
Exposes REST endpoints for all plan-related operations.

Supports:

- Fetching all plans

- Fetching plan by ID

- Adding a new plan

- Editing existing plans

- Deleting plans

### ⚙️ PlanService.java
Contains the business logic behind each API endpoint.

Validates input, manages update flow, and handles data transformations.

Interacts directly with PlanRepository.

### 🧠 PlanRepository.java
Extends JpaRepository to provide data access methods.

Handles database interaction using Spring Data JPA.

Supports operations like findAll(), findById(), save(), and deleteById() automatically.

### 🧾 Plan.java
A JPA entity that maps to the database table for telecom plans.

Fields include:

planId, planName, planType (prepaid/postpaid)

planPrice, planValidity, planDetails, planOffers
## ✅ Testing

Example integration test:

```java
@WebMvcTest(PlanController.class)
public class PlanControllerTest {
  @Autowired MockMvc mockMvc;
  @MockBean PlanService planService; // so we can mock return values

  @Test
  public void testGetAllPlans() throws Exception {
    when(planService.getAll()).thenReturn(Collections.emptyList());
    mockMvc.perform(get("/admin/plan"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$").isArray());
  }
}
```

Covers status codes, JSON format, and path values.

---

## 👀 Screenshots 

### Login Page:
![alt text](https://github.com/MUGIL008/Netfi/blob/803df7d8dac9a4da02f01c32444903d9cd0931ec/Screenshots/Screenshot%20(1508).png)
---

### SignUp Page:
![alt text](https://github.com/MUGIL008/Netfi/blob/803df7d8dac9a4da02f01c32444903d9cd0931ec/Screenshots/Screenshot%20(1507).png)
---

### Admin Home Page:
![alt text](https://github.com/MUGIL008/Netfi/blob/803df7d8dac9a4da02f01c32444903d9cd0931ec/Screenshots/Screenshot%20(1499).png)
---

### User Home Page:
![alt text](https://github.com/MUGIL008/Netfi/blob/803df7d8dac9a4da02f01c32444903d9cd0931ec/Screenshots/Screenshot%20(1503).png)
---

### Admin Requests Page:
![alt text](https://github.com/MUGIL008/Netfi/blob/803df7d8dac9a4da02f01c32444903d9cd0931ec/Screenshots/Screenshot%20(1502).png)
---

### Recharge Successful Page:
![alt text](https://github.com/MUGIL008/Netfi/blob/803df7d8dac9a4da02f01c32444903d9cd0931ec/Screenshots/Screenshot%20(1506).png)
---


## 🚧 Future Improvements

* ✅ JWT-based Auth
* 🔍 Plan search, filter, pagination
* 🛒 Recharge cart & payment API
* 📊 Admin analytics dashboard (charts & metrics)
* 🔔 Email/SMS notifications upon recharge
* 📱 Responsive UI / Mobile-first
* ☁️ CI/CD + Cloud deployment

---

## 🛠️ Setup & Run

### Prerequisites

* Node.js + npm
* Java 11+
* MySQL or H2
* Maven or Gradle

### Frontend

```bash
cd frontend/
npm install
npm run dev
```

### Backend

```bash
cd backend/
mvn clean install
mvn spring-boot:run
```

Set DB settings in `application.properties` for MySQL or H2.

---

🎉 Thank you for reading! If you’re building something similar or need help, feel free to connect with me.

```
