// Get references to DOM elements
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('comment-list');

// Load comments from local storage on page load
window.addEventListener('load', loadComments);

// Handle form submission
commentForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    const email = document.getElementById('email').value.trim();
    const commentText = document.getElementById('comment').value.trim();

    if (isValidEmail(email) && commentText) {
        const newComment = {
            email,
            commentText,
            timestamp: new Date().toLocaleString()
        };
        addComment(newComment);
        saveComment(newComment);
        commentForm.reset(); // Clear form
    } else {
        alert('Please enter a valid email and comment.');
    }
});

// Function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add comment to the DOM
function addComment(comment) {
    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');

    const commentAuthor = document.createElement('h3');
    commentAuthor.textContent = `${comment.email} - ${comment.timestamp}`;

    const commentContent = document.createElement('p');
    commentContent.textContent = comment.commentText;

    commentItem.appendChild(commentAuthor);
    commentItem.appendChild(commentContent);

    // Add the comment to the top of the list
    commentList.prepend(commentItem);
}

// Save comment to local storage
function saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Load comments from local storage
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(addComment);
}
