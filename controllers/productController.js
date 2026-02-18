const supabase = require("../config/supabaseClient");

// READ
exports.getProducts = async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
};

// CREATE
exports.createProduct = async (req, res) => {
  const { name, category, price, stock } = req.body;
  const { data, error } = await supabase
    .from("products")
    .insert([{ name, category, price, stock }]);

  if (error) return res.status(400).json(error);
  res.json(data);
};

// UPDATE
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;

  const { data, error } = await supabase
    .from("products")
    .update({ name, category, price, stock })
    .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json(data);
};

// DELETE
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ message: "ลบสำเร็จ" });
};
