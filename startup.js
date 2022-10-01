let currentPage = 1;
let btns = document.querySelectorAll("button.Next");

for (i of btns) {
  i.addEventListener("click", buttonHandler);
}

async function buttonHandler() {
  document.querySelector(`.Page${currentPage}`).style.opacity = "0";
  await setTimeout(() => {
    document.querySelector(`.Page${currentPage}`).style.display = "none";
    currentPage++;
    document.querySelector(`.Page${currentPage}`).style.opacity = "0";
    document.querySelector(`.Page${currentPage}`).style.display = "flex";
    document.querySelector(`.Page${currentPage}`).style.opacity = "1";
  }, 1000);
}
