let id = 0;

function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const container = document.getElementById("container");

  if (!title && !description) {
    return;
  }
  
    // Div with class name inner
    const maindiv = document.createElement("div");
    maindiv.setAttribute("class", "inner");
    maindiv.setAttribute("id", ++id);

    const innerdiv = document.createElement("div");
    innerdiv.setAttribute("class", "section-1");

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const p = document.createElement("p");
    p.textContent = description;

    const button = document.createElement("button");
    button.setAttribute("onclick", `markAsDone(${id})`)
    button.textContent = "Mark as done";

    // Appending Children elements :
    innerdiv.appendChild(h2);
    innerdiv.appendChild(p);

    maindiv.appendChild(innerdiv);
    maindiv.appendChild(button);

    return container.appendChild(maindiv);
}

function markAsDone(id) {
    const parent = document.getElementById(id);
    parent.children[1].textContent = "Done";
}