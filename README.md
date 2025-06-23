
# BlogFest

**BlogFest** is a lightweight Single-Page Application (SPA) built with vanilla **HTML**, **CSS**, and **JavaScript**, backed by a mock REST API provided by **json-server**. Users can view, create, edit, and delete blog-style posts without page reloads, with all data persisted in a local `db.json`.

---

## 📁 Project Structure

```bash
project-root/
├── db.json        # Mock database for json-server (posts collection)
├── index.html     # Main HTML file hosting the SPA layout
├── style.css      # Basic styling
├── script.js      # Core JavaScript for fetch, render, CRUD
└── README.md      # Project documentation
```

---

## 🚀 Features (MVP)

- [x] **Home / Post List**
  - Live list of all posts
  - Click any title to view full details
- [x] **Post Detail View**
  - Display title, author (or `Anonymous`), image, and content
  - Buttons to **Edit**, **Save**, and **Delete**
- [x] **Create Post**
  - Form to add a new post (title, author, image URL, content)
- [x] **Edit Post**
  - Inline editing of the current post
  - Save changes via `PATCH` request
- [x] **Delete Post**
  - Remove a post via `DELETE` request
- [x] **SPA Behavior**
  - No full-page reloads; dynamic DOM updates via `fetch`
  - First post auto-loads on startup

---

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Install json-server**

   ```bash
   npm install -g json-server
   ```

3. **Run the mock API**

   ```bash
   json-server --watch db.json --port 3000
   ```

4. **Open the app**

   - Open `index.html` in your browser
   - Ensure the API endpoint `http://localhost:3000/posts` is running

---

## 🛠️ Usage

1. **View Posts**: Click a title in the list to load its details.
2. **Create Post**: Fill out the "Create New Post" form and submit.
3. **Edit Post**: In detail view, click **Edit**, make changes, then **Save**.
4. **Delete Post**: In detail view, click **Delete** to remove it.

---

## 📖 Future Enhancements

- [ ] Extract inline styles into dedicated **CSS classes**
- [ ] Add **user authentication** (author vs. reader roles)
- [ ] Implement **search/filter** by title or content
- [ ] Add **comments** and **likes** features
- [ ] Improve **responsive design** and accessibility

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature/name`)
5. Open a Pull Request

---
