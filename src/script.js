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

  if (posts[0]) {
    console.log(posts[0]);
  }

  if (posts[1]) {
    console.log(posts[1]);
  }
  // document.write('<html><body><h2>HTML</h2></body></html>');
}