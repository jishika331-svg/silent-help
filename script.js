// 🔹 REPLACE WITH YOUR OWN FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDSSK_xjxUTwSWC-Q9KYsqx6AxT_WdHGUc",
  authDomain: "silent-help-39365.firebaseapp.com",
  projectId: "silent-help-39365",
  storageBucket: "silent-help-39365.firebasestorage.app",
  messagingSenderId: "863112871190",
  appId: "1:863112871190:web:03fd08dc7f3539a15e2437"
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
