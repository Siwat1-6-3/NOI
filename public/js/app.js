const API = "/api/products";

// โหลดสินค้า
async function loadProducts() {
  const res = await fetch(API);
  const data = await res.json();

  const table = document.getElementById("productTable");
  if (!table) return;

  table.innerHTML = "";

  data.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteProduct(${p.id})">
            ลบ
          </button>
        </td>
      </tr>
    `;
  });
}

// เพิ่มสินค้า
const form = document.getElementById("addForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, price, stock })
    });

    // กลับหน้าแรก
    window.location.href = "/";
  });
}

// ลบสินค้า
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
  loadProducts();
}

loadProducts();