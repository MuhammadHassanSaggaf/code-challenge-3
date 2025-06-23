
// script.js
const API_URL = "http://localhost:3000/posts";

// DOM elements
const postList = document.getElementById("post-list");
const postView = document.getElementById("post-view");
const postEditorForm = document.querySelector(".post-form");

let posts = [];
let currentPost = null;

// Fetch all posts and initialize view
function getPosts() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      posts = data;
      renderPostList();
      if (posts.length > 0) {
        viewPost(posts[0].id);
      }
    })
    .catch(console.error);
}

// Render list of posts with click listener
function renderPostList() {
  postList.innerHTML = "";
  posts.forEach((post) => {
    const li = document.createElement("li");
    // li.textContent = post.title;
    const liTitle = post.title;
    li.innerHTML = `
    <h2>${liTitle}</h2>
    `
    li.style.cursor = "pointer";

    li.addEventListener("click", () => viewPost(post.id));
    postList.appendChild(li);
  });
}

// Display a single post in detail
function viewPost(id) {
  currentPost = posts.find((p) => p.id === id);
  if (!currentPost) return;

  postView.innerHTML = `
    <h2>${currentPost.title}</h2>
    <h4>By ${currentPost.author || 'Anonymous'}</h4>
    ${currentPost.imageURL ? `<img src="${currentPost.imageURL}" alt="${currentPost.title}" style="max-width:100%; height:auto; margin-bottom:12px;" />` : ''}
    <p>${currentPost.content}</p>
    <div id="post-buttons" style="display: flex; gap: 8px; margin-top: 12px;">
      <button id="edit-btn">Edit</button>
      <button id="save-btn" style="display:none;">Save</button>
      <button id="delete-btn">Delete</button>
    </div>
  `;

  // Style buttons via CSS classes
  document.getElementById("post-buttons").querySelectorAll("button").forEach((btn) => {
    btn.style.padding = "6px 12px";
    btn.style.border = "none";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";
  });

  document.getElementById("edit-btn").style.backgroundColor = "#007bff";
  document.getElementById("edit-btn").style.color = "#fff";
  document.getElementById("save-btn").style.backgroundColor = "#28a745";
  document.getElementById("save-btn").style.color = "#fff";
  document.getElementById("delete-btn").style.backgroundColor = "#dc3545";
  document.getElementById("delete-btn").style.color = "#fff";

  document.getElementById("edit-btn").addEventListener("click", editPost);
  document.getElementById("save-btn").addEventListener("click", savePost);
  document.getElementById("delete-btn").addEventListener("click", () => deletePost(currentPost.id));
}

// Enable editing of current post
function editPost() {
  if (!currentPost) return;
  postView.innerHTML = `
    <input id="edit-title" value="${currentPost.title}" style="width: 100%; margin-bottom:8px; padding:4px;" />
    <input id="edit-author" value="${currentPost.author || ''}" style="width: 100%; margin-bottom:8px; padding:4px;" />
    <input id="edit-imageURL" value="${currentPost.imageURL}" style="width: 100%; margin-bottom:8px; padding:4px;" />
    <textarea id="edit-content" style="width: 100%; margin-bottom:12px; padding:4px;" rows="5">${currentPost.content}</textarea>
    <div style="display: flex; gap: 8px; margin-top: 12px;">
      <button id="save-btn">Save</button>
      <button id="cancel-btn">Cancel</button>
    </div>
  `;

  document.getElementById("save-btn").style.padding = "6px 12px";
  document.getElementById("save-btn").style.backgroundColor = "#28a745";
  document.getElementById("save-btn").style.color = "#fff";
  document.getElementById("save-btn").style.border = "none";
  document.getElementById("save-btn").style.borderRadius = "4px";
  document.getElementById("save-btn").style.cursor = "pointer";

  document.getElementById("cancel-btn").style.padding = "6px 12px";
  document.getElementById("cancel-btn").style.backgroundColor = "#6c757d";
  document.getElementById("cancel-btn").style.color = "#fff";
  document.getElementById("cancel-btn").style.border = "none";
  document.getElementById("cancel-btn").style.borderRadius = "4px";
  document.getElementById("cancel-btn").style.cursor = "pointer";

  document.getElementById("save-btn").addEventListener("click", savePost);
  document.getElementById("cancel-btn").addEventListener("click", () => viewPost(currentPost.id));
}

// Save edited post via PATCH
function savePost() {
  const updated = {
    title: document.getElementById("edit-title").value,
    author: document.getElementById("edit-author").value,
    imageURL: document.getElementById("edit-imageURL").value,
    content: document.getElementById("edit-content").value,
  };
  fetch(`${API_URL}/${currentPost.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  })
    .then((res) => res.json())
    .then((data) => {
      const idx = posts.findIndex((p) => p.id === currentPost.id);
      posts[idx] = data;
      viewPost(data.id);
      renderPostList();
    })
    .catch(console.error);
}

// Delete a post
function deletePost(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => {
      posts = posts.filter((p) => p.id !== id);
      renderPostList();
      if (posts.length > 0) viewPost(posts[0].id);
      else postView.innerHTML = "<p>No posts available.</p>";
    })
    .catch(console.error);
}

// Handle new post creation
function createPost(event) {
  event.preventDefault();
  const newPost = {
    title: document.getElementById("post-title").value,
    author: document.getElementById("post-author").value,
    imageURL: document.getElementById("image-url").value,
    content: document.getElementById("post-content").value,
  };
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
    .then((res) => res.json())
    .then((created) => {
      posts.unshift(created);
      renderPostList();
      viewPost(created.id);
      postEditorForm.reset();
    })
    .catch(console.error);
}

// Initialize
postEditorForm.addEventListener("submit", createPost);
getPosts();
