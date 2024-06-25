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
    let date = "";
    
    return (
      `<div>
        <h1>${date}</h1>
        <p>${text}</p>
        <p>${imgs}</p>
      </div>`
    );
  }

  function fromHTML(html, trim = true) {
    html = trim ? html.trim() : html;
    if (!html) return null;

    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;

    if (result.length === 1) return result[0];
    return result;
  }

  for (let i = 0; i < 2; i++)
  {  
    if (posts[i]) {
      console.log(posts[i]);
      const post = fromHTML(postForm(posts[i].text, posts[i].attachments));
      postsContainer.appendChild(post);
    }
  }
}