const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 2;

const { width, height } = canvas.getBoundingClientRect();

if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
  canvas.width = width * dpr;
  canvas.height = height * dpr;
}

ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.scale(dpr, dpr);

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}, 1000)

document.onmousemove = (event) => {
  function getRandomColor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  console.log(event.x, event.y);

  ctx.beginPath();
  ctx.arc(event.x, event.y, Math.random() * 10, 0, 2 * Math.PI);
  ctx.fillStyle = getRandomColor();
  ctx.fill();
}

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