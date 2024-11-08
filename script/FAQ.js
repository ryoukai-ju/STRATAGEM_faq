const faq = document.getElementsByClassName("faq-box-question");
let i;
for (let i = 0; i < faq.length; i++) {
  faq[i].addEventListener("click", function () {
    this.classList.toggle("active");

    /* answer */
    const body = this.nextElementSibling;
    if (body.style.maxHeight === "200px") {
      body.style.maxHeight = "0px";
    } else {
      body.style.maxHeight = "200px";
    }
  });
}
