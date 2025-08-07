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

This app is structured around the following core pages:

- `/` – **Home Feed**  
  Displays recent posts from all communities.

- `/create` – **Create a Post**  
  Form page to submit a new post.

- `/post/:id` – **Post Details**  
  View a single post along with its comments and replies.

- `/community/create` – **Create a Community**  
  Allows users to start a new community.

- `/communities` – **Explore Communities**  
  Lists all available communities.

- `/community` – **Explore Communities (Alternate Route)**  
  Duplicate route to the `/communities` page for compatibility.

- `/community/:id` – **Community Page**  
  Shows posts and information about a specific community.

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
