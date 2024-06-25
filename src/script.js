const postsContainer = document.getElementById("post-container");

fetch('https://scrapbook.hackclub.com/api/users/NguyễnGiaBách')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    renderScrapbook(data.posts);
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
    console.log(posts[0]);
    const post = document.createElement("div");
    post.innerHTML = postForm(post[0].text);
    postsContainer.appendChild(post);

  }

  if (posts[1]) {
    console.log(posts[1]);
    const post = document.createElement("div");
    post.innerHTML = postForm(post[1].text);
    postsContainer.appendChild(post);

  }
}