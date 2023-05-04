function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "diary";

    const header = document.createElement("h2");
    header.textContent = data["date"];
    post.appendChild(header);

    const text = document.createElement("p");
    text.textContent = data["text"];
    post.appendChild(text);

    const category = document.createElement("p");
    category.textContent = data["category"];
    post.appendChild(category);

    return post;
}

document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: form.get("date"),
            text: form.get("text"),
            Category: form.get("category")
        })
    }

    const result = await fetch("http://localhost:3000/diarys", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

async function loadPosts () {

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/diarys", options);

    if (response.status == 200) {
        const posts = await response.json();

        const container = document.getElementById("posts");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }

}

loadPosts();
