const postsContainer = document.getElementById("post-container");
const parser = new DOMParser();

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
      imgs += `<img src="${attachments[i]}" alt="Attachment" id="pic-${i}" />\n`;
    };
    
    return (
      `<h1>Test<h1/><p>${text}<p/>${imgs}`
    );
  }

  for (let i = 0; i < 2; i++)
  {  
    if (posts[i]) {
      console.log(posts[i]);
      const post = document.createElement("div");
      posts[i].text = posts[i].text.replace("\n", "<br /><br />");
      console.log(parser.parseFromString(postForm(posts[i].text, posts[i].attachments), "text/html"));
      post.innerHTML = parser.parseFromString(parser.parseFromString(postForm(posts[i].text, posts[i].attachments), "text/html"), "text/html");
      postsContainer.appendChild(post);
    }
  }
}