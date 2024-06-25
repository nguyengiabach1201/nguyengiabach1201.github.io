const postsContainer = document.getElementById("post-container");
const background = document.getElementById("bg-grid");

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
  const postForm = (text, attachments, timestamp, reactions) => {
    let imgs = "";
    for (let i = 0; i < attachments.length; i++) {
      imgs += `<img src="${attachments[i]}" alt="Attachment" id="pic-${i}" />\n`;
    };
    let date = formatTimestamp(timestamp);
    let emojis = ""
    for (let i = 0; i < reactions.length; i++) {
      if (reactions[i].url)
        emojis += `<img src="${reactions[i].url}" alt="Reactions" />\n`;
      else if (reactions[i].char)
        emojis += `<p>${reactions[i].char}</p>\n`;
    };

    return (
      `<div>
        <h2>${date}</h2>
        <p>${text}</p>
        <div id="imgs">${imgs}</div>
        <br/><br/>
        <div id="reactions">${emojis}</div>
      </div>`
    );
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 for milliseconds
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
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

  for (let i = 0; i < 2; i++) {
    if (posts[i]) {
      console.log(posts[i].reactions);
      posts[i].text = posts[i].text.replace("\n", "<br /><br />")
      const post = fromHTML(postForm(posts[i].text, posts[i].attachments, posts[i].timestamp, posts[i].reactions));
      postsContainer.appendChild(post);
    }
  }
}

function background() {
  const colors = [
    "#e71d43",
    "#ff0000",
    "#ff3700",
    "#ff6e00",
    "#ffa500",
    "#ffc300",
    "#ffe100",
    "#ffff00",
    "#aad500",
    "#55aa00",
    "#008000",
    "#005555",
    "#002baa",
    "#0000ff",
    "#1900d5",
    "#3200ac",
    "#4b0082",
    "#812ba6",
    "#b857ca",
    "#d03a87",
  ];

  colors.forEach(color => {
    
  });
}

background();