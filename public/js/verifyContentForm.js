const form = document.querySelector("form");
const letras = document.querySelectorAll("input");
console.log(form);

letras.forEach((input) => {
    input.addEventListener("focus", () => {
      // Coloca o cursor no final do texto
      const length = input.value.length;
      input.setSelectionRange(length, length);
    });
  });

  letras.forEach((input, index) => {
    input.addEventListener("input", () => {
      // Se a letra foi digitada, passa para o próximo input
      if (input.value.trim() !== "" && index < letras.length - 1) {
        letras[index + 1].focus();
      }
    });
  });

form.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    var allFilled = true;

    letras.forEach((input) => {
        input.style.borderColor = '#fff'
      // Trim para verificar se existe alguma input não preenchida
      if (input.value.trim() === "") {
        allFilled = false;
      }
    });

    if (!allFilled) {
      e.preventDefault();
      letras.forEach((input) => {
        console.log("Rodando...");
        if (input.value.trim() === "") {
          input.style.borderColor = "red";
        }
      });
    } else {
      const word = Array.from(letras)
        .map((i) => i.value)
        .join("");
      console.log(word);
    }
  }
});
