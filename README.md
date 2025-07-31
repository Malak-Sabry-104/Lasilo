# 🪩 Lasilo — Your Communities, Your Spark

**Lasilo** is a gamified social media platform where users can express themselves, engage in meaningful discussions, and connect through dynamic communities. Inspired by Facebook and Reddit but designed to be lighter, more interactive, and developer-friendly.

>— Your Communities, Your Spark.

---

## 🌟 Features

- 🔐 Sign in with **GitHub**
- 📝 Create and view posts in real-time
- 📌 Join and create communities of shared interests
- ❤️ Like or 💔 dislike posts
- 💬 Threaded comments & replies (Reddit-style)
- 📊 Explore a feed of the most recent or trending posts

---

## 🧩 Target Users

| 👤 User Type     | 💡 Value Proposition                                                |
|------------------|---------------------------------------------------------------------|
| **Social Users** | Discover new communities, share ideas, and build connections       |
| **Creators**     | Build and moderate their own community space                       |
| **Developers**   | Contribute to an open-source app built with a modern tech stack    |

---

## 🗺️ Pages (MVP)

- `/` - Home Feed (Recent Posts)
- `/auth` - Login/Register (via GitHub)
- `/communities` - Explore Communities
- `/community/:id` - Community Page (Posts + Info)
- `/create` - Create a Post
- `/post/:id` - Post Details (Comments + Replies)
- `/profile/:id` - User Profile

---

## 💻 Tech Stack

| Layer              | Technology         |
|--------------------|--------------------|
| Frontend Framework | **React**          |
| Language           | **TypeScript**     |
| Styling            | **Tailwind CSS**   |
| Build Tool         | **Vite**           |
| Routing            | **React Router**   |
| Backend-as-a-Service | **Supabase**    |
| Database           | **PostgreSQL**     |
| Hosting            | Vercel / Netlify   |

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/lasilo.git
cd lasilo
npm install
npm run dev
