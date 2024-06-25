let posts = [];
const postsContainer = document.getElementById("post-container");

fetch('https://scrapbook.hackclub.com/api/users/NguyễnGiaBách')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    posts = data.posts;
    renderScrapbook(posts);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function renderScrapbook(posts) {
  console.log(posts, postsContainer);
  const postForm = (text) => {
    return (
      `<div>
        <p>${text}<p/>
      <div/>`
    );
  }

  if (posts[0]) {
    const post = document.createElement("div");
    postsContainer.appendChild(post);
    console.log(posts[0]);
  }

  if (posts[1]) {
    const post = document.createElement("div");
    postsContainer.appendChild(post);
    console.log(posts[1]);
  }
}