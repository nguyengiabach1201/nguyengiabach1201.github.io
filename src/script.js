//
// Drawing random dots in the background as you move your mouse
//

const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

function setCanvasSize() {
    const dpr = window.devicePixelRatio || 2;

    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
}
setCanvasSize();

window.onresize = () => {
    setCanvasSize();

    for (let i = 0; i < dots.length; i++) {
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, dots[i].radius, 0, 2 * Math.PI);
        ctx.fillStyle = dots[i].color;
        ctx.fill();
    }
};

const dots = [];

function addDots(x, y) {
    function getRandomColor() {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    dots.push({
        x: x,
        y: y,
        radius: Math.random() * 20,
        color: getRandomColor(),
    });
    while (dots.length > 20) dots.shift();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dots.length; i++) {
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, dots[i].radius, 0, 2 * Math.PI);
        ctx.fillStyle = dots[i].color;
        ctx.fill();
    }
}

document.onmousemove = (event) => addDots(event.x, event.y);
document.ontouchmove = (event) =>
    addDots(event.touches[0].clientX, event.touches[0].clientY);

//
// Display latest scrapbook post
//

const postsContainer = document.querySelector(".post-container");

fetch("https://scrapbook.hackclub.com/api/users/NguyễnGiaBách")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        renderScrapbook(data.posts);
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });

function renderScrapbook(posts) {
    const postForm = (text, attachments, timestamp, reactions) => {
        let imgs = "";
        for (let i = 0; i < attachments.length; i++) {
            imgs += `<img src="${attachments[i]}" alt="Attachment" id="pic-${i}" />\n`;
        }
        let date = formatTimestamp(timestamp);
        let emojis = "";
        for (let i = 0; i < reactions.length; i++) {
            if (reactions[i].url)
                emojis += `<img src="${reactions[i].url}" alt="Reactions" />\n`;
            else if (reactions[i].char)
                emojis += `<p>${reactions[i].char}</p>\n`;
        }

        return `<div>
        <h2>${date}</h2>
        <p>${text}</p>
        <div id="imgs">${imgs}</div>
        <br/><br/>
        <div id="reactions">${emojis}</div>
      </div>`;
    };

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000); // Multiply by 1000 for milliseconds
        const options = {
            weekday: "short",
            month: "short",
            day: "numeric",
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    function fromHTML(html, trim = true) {
        html = trim ? html.trim() : html;
        if (!html) return null;

        const template = document.createElement("template");
        template.innerHTML = html;
        const result = template.content.children;

        if (result.length === 1) return result[0];
        return result;
    }

    for (let i = 0; i < 6; i++) {
        if (posts[i]) {
            posts[i].text = posts[i].text.replace("\n", "<br /><br />");
            const post = fromHTML(
                postForm(
                    posts[i].text,
                    posts[i].attachments,
                    posts[i].timestamp,
                    posts[i].reactions
                )
            );
            postsContainer.appendChild(post);
        }
    }
}

//
// Secret Konami code
//

var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    65: "a",
    66: "b",
};

var konamiCode = [
    "up",
    "up",
    "down",
    "down",
    "left",
    "right",
    "left",
    "right",
    "b",
    "a",
];
var konamiCodePosition = 0;

document.addEventListener("keydown", function (e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];

    if (key == requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition == konamiCode.length) {
            activateCheats();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateCheats() {
    var audio = new Audio("./assets/audios/Back beat to idk.m4a");
    audio.play();

    alert("Music activated!");
}

//
// Piano
//

Tone.start();
const synth = new Tone.Synth().toDestination();
document.onkeydown = function (e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    if (key === 83) {
        playNote("C");
    }
    if (key === 68) {
        playNote("D");
    }
    if (key === 70) {
        playNote("E");
    }
    if (key === 71) {
        playNote("F");
    }
    if (key === 72) {
        playNote("G");
    }
    if (key === 74) {
        playNote("A");
    }
    if (key === 75) {
        playNote("B");
    }
};
function playNote(note) {
    synth.triggerAttackRelease(`${note}4`, "8n");
    document.getElementById(note).style.background = "#33d6a6";
    setTimeout(() => {
        document.getElementById(note).style.background = "white";
    }, 200);
}
