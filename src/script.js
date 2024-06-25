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
    let imgs = "";
    for (let i = 0; i < attachments.length; i++) {
      imgs += `<img src="${attachments[i]}" alt="Attachment" />\n`;
    };
    
    return (
      `<p>${text}<p/>
      ${imgs}`
    );
  }

  for (let i = 0; i < 2; i++)
  {  
    if (posts[i]) {
      console.log(posts[i]);
      const post = document.createElement("div");
      posts[i].text = posts[i].text.replace("\n", "<br /><br />");
      post.innerHTML = postForm(posts[i].text, posts[i].attachments);
      postsContainer.appendChild(post);
    }
  }
}