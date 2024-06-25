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
  const postForm = (text, attachments) => {
    return (
      `<p>${text}<p/>`
    );
  }

  for (let i = 0; i < 2; i++)
  {  
    if (posts[i]) {
      // console.log(posts[i].text);
      const post = document.createElement("div");
      post.innerHTML = postForm(posts[i].text.replace("\n", "<br /><br />"), posts[i].attachments);
      postsContainer.appendChild(post);
    }
  }
}