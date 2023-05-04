function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";

    const header = document.createElement("h2");
    header.textContent = data["Date"];
    post.appendChild(header);

    const text = document.createElement("p");
    text.textContent = data["Text"];
    post.appendChild(text);

    const category = document.createElement("p");
    category.textContent = data["Category"];
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
            Date: form.get("Date"),
            Text: form.get("Text"),
            Category: form.get("Category")
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
