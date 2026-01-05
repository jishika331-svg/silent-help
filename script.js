// 🔹 REPLACE WITH YOUR OWN FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission
const form = document.getElementById("helpForm");
const postsDiv = document.getElementById("posts");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const category = document.getElementById("category").value;
  const message = document.getElementById("message").value;

  db.collection("posts").add({
    category: category,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    form.reset();
    alert("Your concern has been submitted anonymously.");
  });
});

// Fetch and display posts
db.collection("posts")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    postsDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();

      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <strong>${data.category}</strong>
        <p>${data.message}</p>
      `;
      postsDiv.appendChild(div);
    });
  });
