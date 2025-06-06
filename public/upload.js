import { storage, db } from "./firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

document.getElementById("upload-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const imageFile = document.getElementById("image").files[0];

  if (!imageFile) {
    alert("Por favor, selecione uma imagem.");
    return;
  }

  const imageRef = ref(storage, `produtos/${Date.now()}_${imageFile.name}`);
  await uploadBytes(imageRef, imageFile);

  const imageUrl = await getDownloadURL(imageRef);

  await addDoc(collection(db, "produtos"), {
    nome: name,
    preco: parseFloat(price),
    descricao: desc,
    imagemUrl: imageUrl,
    dataCadastro: new Date()
  });

  alert("Produto cadastrado com sucesso!");
  e.target.reset();
});
