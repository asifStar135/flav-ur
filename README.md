# 🍽️ Flav-ur - Your Personal Recipe Companion

📖 **Discover, Save, and Personalize Your Favorite Recipes**

![logo](https://drive.google.com/file/d/1N_J3uJ1_EjpoGzwLzhFB4ag9LglfNY5a/view?usp=sharing)

---

## 🚀 About Flav-ur

Flav-ur is a **full-stack recipe discovery and cookbook app** built using **Next.js, TypeScript, Tailwind CSS, and MongoDB**.  
It allows users to **search, save, and manage recipes** while adding **custom notes** for a personalized cooking experience.

---

## ✨ Features

- 🔹 **Recipe Discovery** – Browse recipes with advanced search and filtering
- 🔹 **Personal Cookbook** – Save and organize your favorite recipes
- 🔹 **Custom Notes** – Add your own notes to recipes
- 🔹 **Smooth UX** – Built with **Ant Design, Tailwind CSS, and Zustand**
- 🔹 **Optimized Performance** – Uses **debouncing, caching, and infinite scrolling**
- 🔹 **Secure Authentication** – Powered by **Clerk.js**

---

## 🛠 Tech Stack

| **Technology**   | **Usage**                                   |
| ---------------- | ------------------------------------------- |
| **Next.js 15**   | Full-stack framework                        |
| **TypeScript**   | Type safety & maintainability               |
| **Tailwind CSS** | UI styling                                  |
| **Ant Design**   | Pre-built UI components                     |
| **MongoDB**      | Database for storing user cookbooks & notes |
| **Zustand**      | State management                            |
| **Clerk.js**     | Authentication                              |
| **Axios**        | API calls                                   |

---

## 📂 Project Structure

```sh
flav-ur/
│── src/
│   ├── components/   # Reusable UI components
│   ├── app/          # Next.js app (routes)
│   ├── config/       # config functions like db connection
│   ├── helper/       # reusable helper functions
│   ├── models/       # data models (mongoose)
│   ├── services/     # services (apis)
│── public/           # Static assets (logo, images)
│── package.json      # Project dependencies
│── README.md         # Project documentation
```

# 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/flav-ur.git
cd flav-ur
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a .env.local file in the root directory and add:

```sh
MONGO_URI=ur_mongo_uri
ENV=development
DOMAIN=http://localhost:3000
TOKEN_SECRET=ur_token

# For public & client side access api credentials
NEXT_PUBLIC_API_KEY=d6a960573e7a414aab40c01a59dff752
NEXT_PUBLIC_API_KEY2=6e6c9aaff44b4a74b01ae0db2daf9af7
NEXT_PUBLIC_API_URL=https://api.spoonacular.com

#########   CLERK AUTHENTICATION CREDENTIALS ########
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bm9ybWFsLWVsay0yNS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_TGVb02M1fQFeCX4qWkN0IaTtxPvCzolORqysH7Orpa
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
```

### 4️⃣ Run the Project

```sh
npm run dev
```

Visit http://localhost:3000 in your browser.

# 📚 Future Enhancements

### ✅ Meal Planner – Plan meals for the week

### ✅ Shopping List – Generate grocery lists from recipes

### ✅ Shared Cookbooks – Collaborate with friends & family

# 🤝 Contribution Guide

Want to contribute? Fork the repo, create a branch, and submit a PR!

```sh
git checkout -b feature-branch
git commit -m "Add new feature"
git push origin feature-branch
```

# 🌟 Show Your Support

⭐ Star the repo if you like the project!

🐦 Follow me on LinkedIn for updates!

# 📩 Contact

💡 Developed by Md Asif
📧 Reach out: asifstar135@gmail.com
