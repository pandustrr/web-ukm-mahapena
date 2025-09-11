// File: src/pages/admin/ManajemenMerchandise.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManajemenMerchandise() {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");

    const [merchandises, setMerchandises] = useState([]);
    const [editMerchId, setEditMerchId] = useState(null);

    const [merchName, setMerchName] = useState("");
    const [merchPrice, setMerchPrice] = useState("");
    const [merchStock, setMerchStock] = useState("");
    const [description, setDescription] = useState("");
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizeInput, setSizeInput] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [image, setImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const token = sessionStorage.getItem("adminToken");

    // ===============================
    // Fetch Categories
    // ===============================
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/admin/categories", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(res.data);
            if (!selectedCategory && res.data.length > 0) {
                setSelectedCategory(res.data[0].id.toString());
            }
        } catch (err) {
            console.error("Error fetch categories:", err);
            alert("Error fetching categories: " + (err.response?.data?.message || err.message));
        }
    };

    // ===============================
    // Fetch Merchandise
    // ===============================
    const fetchMerchandises = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/admin/merchandises", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMerchandises(res.data);
        } catch (err) {
            console.error("Error fetch merchandises:", err);
            alert("Error fetching merchandises: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // ===============================
    // Reset Form
    // ===============================
    const resetForm = () => {
        setMerchName("");
        setMerchPrice("");
        setMerchStock("");
        setDescription("");
        setSizes([]);
        setColors([]);
        setSizeInput("");
        setColorInput("");
        setImage(null);
        setEditMerchId(null);

        if (categories.length > 0) {
            setSelectedCategory(categories[0].id.toString());
        }
    };

    // ===============================
    // Tambah / Update Kategori
    // ===============================
    const handleSubmitCategory = async (e) => {
        e.preventDefault();
        try {
            if (editCategoryId) {
                await axios.put(
                    `http://localhost:8000/api/admin/categories/${editCategoryId}`,
                    { name: editCategoryName },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setEditCategoryId(null);
                setEditCategoryName("");
            } else {
                await axios.post(
                    "http://localhost:8000/api/admin/categories",
                    { name: newCategoryName },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setNewCategoryName("");
            }
            fetchCategories();
        } catch (err) {
            console.error("Error tambah/edit kategori:", err);
            alert("Error: " + (err.response?.data?.message || err.message));
        }
    };

    const handleEditCategory = (cat) => {
        setEditCategoryId(cat.id);
        setEditCategoryName(cat.name);
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm("Yakin hapus kategori ini?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/admin/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCategories();
        } catch (err) {
            console.error("Error hapus kategori:", err);
            alert("Error: " + (err.response?.data?.message || err.message));
        }
    };

    // ===============================
    // Tambah / Update Merchandise
    // ===============================
    const handleSubmitMerchandise = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", merchName);
            formData.append("category_id", selectedCategory);
            formData.append("price", parseFloat(merchPrice));
            formData.append("stock", parseInt(merchStock));
            formData.append("description", description);

            // Array
            sizes.forEach((s) => formData.append("sizes[]", s));
            colors.forEach((c) => formData.append("colors[]", c));

            if (image) {
                formData.append("image", image);
            }

            let response;
            if (editMerchId) {
                // UPDATE
                response = await axios.post(
                    `http://localhost:8000/api/admin/merchandises/${editMerchId}?_method=PUT`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
            } else {
                // CREATE
                response = await axios.post(
                    "http://localhost:8000/api/admin/merchandises",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
            }

            console.log("Response:", response.data);
            alert(editMerchId ? "Merchandise berhasil diupdate!" : "Merchandise berhasil ditambahkan!");

            resetForm();
            fetchMerchandises();

        } catch (err) {
            console.error("Error:", err.response?.data);
            alert("Error: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleEditMerch = (m) => {
        setEditMerchId(m.id);
        setMerchName(m.name);
        setMerchPrice(m.price.toString());
        setMerchStock(m.stock.toString());
        setDescription(m.description || "");
        setSizes(m.sizes || []);
        setColors(m.colors || []);
        setSelectedCategory(m.category_id.toString());

        // Scroll ke form
        document.getElementById('merch-form').scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeleteMerch = async (id) => {
        if (!confirm("Yakin hapus merchandise ini?")) return;
        try {
            setLoading(true);
            await axios.delete(`http://localhost:8000/api/admin/merchandises/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchMerchandises();
            alert("Merchandise berhasil dihapus!");
        } catch (err) {
            console.error("Error hapus merchandise:", err);
            alert("Error: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // ===============================
    // Size / Color
    // ===============================
    const handleAddSize = () => {
        if (sizeInput.trim() && !sizes.includes(sizeInput.trim())) {
            setSizes([...sizes, sizeInput.trim()]);
        }
        setSizeInput("");
    };

    const handleRemoveSize = (s) => {
        setSizes(sizes.filter((item) => item !== s));
    };

    const handleAddColor = () => {
        if (colorInput.trim() && !colors.includes(colorInput.trim())) {
            setColors([...colors, colorInput.trim()]);
        }
        setColorInput("");
    };

    const handleRemoveColor = (c) => {
        setColors(colors.filter((item) => item !== c));
    };

    useEffect(() => {
        fetchCategories();
        fetchMerchandises();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#113F67]">Manajemen Merchandise</h2>

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="text-lg">Loading...</p>
                    </div>
                </div>
            )}

            {/* Kategori Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4 text-[#3674B5]">Manajemen Kategori</h3>

                <form onSubmit={handleSubmitCategory} className="mb-4">
                    <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        <input
                            type="text"
                            value={editCategoryId ? editCategoryName : newCategoryName}
                            onChange={(e) =>
                                editCategoryId
                                    ? setEditCategoryName(e.target.value)
                                    : setNewCategoryName(e.target.value)
                            }
                            placeholder="Nama kategori"
                            className="border p-2 rounded flex-1"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-[#3674B5] text-white px-4 py-2 rounded hover:bg-[#5682B1]"
                            disabled={loading}
                        >
                            {editCategoryId ? "Update" : "Tambah"}
                        </button>
                        {editCategoryId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditCategoryId(null);
                                    setEditCategoryName("");
                                }}
                                className="px-4 py-2 rounded border hover:bg-gray-100"
                                disabled={loading}
                            >
                                Batal
                            </button>
                        )}
                    </div>
                </form>

                {/* List kategori */}
                <div>
                    <h4 className="font-medium mb-2">Daftar Kategori:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                <span className="font-medium">{cat.name}</span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEditCategory(cat)}
                                        className="bg-yellow-400 px-2 py-1 rounded text-sm"
                                        disabled={loading}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(cat.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                        disabled={loading}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Merchandise Form Section */}
            <div id="merch-form" className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4 text-[#3674B5]">
                    {editMerchId ? "Edit Merchandise" : "Tambah Merchandise Baru"}
                </h3>

                <form onSubmit={handleSubmitMerchandise} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Nama Merchandise *</label>
                        <input
                            type="text"
                            value={merchName}
                            onChange={(e) => setMerchName(e.target.value)}
                            placeholder="Nama merchandise"
                            className="border p-2 rounded w-full"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Harga *</label>
                        <input
                            type="number"
                            value={merchPrice}
                            onChange={(e) => setMerchPrice(e.target.value)}
                            placeholder="Harga"
                            className="border p-2 rounded w-full"
                            required
                            disabled={loading}
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Stock *</label>
                        <input
                            type="number"
                            value={merchStock}
                            onChange={(e) => setMerchStock(e.target.value)}
                            placeholder="Stock"
                            className="border p-2 rounded w-full"
                            required
                            disabled={loading}
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Kategori *</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                            disabled={loading}
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Deskripsi</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Deskripsi merchandise"
                            className="border p-2 rounded w-full h-20"
                            disabled={loading}
                        ></textarea>
                    </div>

                    {/* Sizes */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Sizes</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={sizeInput}
                                onChange={(e) => setSizeInput(e.target.value)}
                                placeholder="Masukkan size"
                                className="border p-2 rounded flex-1"
                                disabled={loading}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
                            />
                            <button
                                type="button"
                                onClick={handleAddSize}
                                className="bg-[#3674B5] text-white px-4 py-2 rounded"
                                disabled={loading}
                            >
                                Tambah
                            </button>
                        </div>
                        <div className="mt-2 flex gap-2 flex-wrap">
                            {sizes.map((s, i) => (
                                <span key={i} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                                    {s}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSize(s)}
                                        className="text-red-500 font-bold text-sm"
                                        disabled={loading}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Colors</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={colorInput}
                                onChange={(e) => setColorInput(e.target.value)}
                                placeholder="Masukkan color"
                                className="border p-2 rounded flex-1"
                                disabled={loading}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
                            />
                            <button
                                type="button"
                                onClick={handleAddColor}
                                className="bg-[#3674B5] text-white px-4 py-2 rounded"
                                disabled={loading}
                            >
                                Tambah
                            </button>
                        </div>
                        <div className="mt-2 flex gap-2 flex-wrap">
                            {colors.map((c, i) => (
                                <span key={i} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                                    {c}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveColor(c)}
                                        className="text-red-500 font-bold text-sm"
                                        disabled={loading}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium">Gambar</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border p-2 rounded w-full"
                            accept="image/*"
                            disabled={loading}
                        />
                        {image && (
                            <p className="text-sm text-green-600 mt-1">File selected: {image.name}</p>
                        )}
                    </div>

                    <div className="md:col-span-2 flex gap-2">
                        <button
                            type="submit"
                            className="bg-[#3674B5] text-white px-6 py-2 rounded hover:bg-[#5682B1]"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (editMerchId ? 'Update Merchandise' : 'Tambah Merchandise')}
                        </button>

                        {editMerchId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 rounded border hover:bg-gray-100"
                                disabled={loading}
                            >
                                Batal Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List Merchandise Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-[#3674B5]">Daftar Merchandise</h3>

                {merchandises.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Belum ada merchandise</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 border border-gray-300 font-semibold">ID</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Nama</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Kategori</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Harga</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Stock</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Deskripsi</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Sizes</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Colors</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Gambar</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {merchandises.map((m) => (
                                    <tr key={m.id} className="hover:bg-gray-50">
                                        <td className="p-3 border border-gray-300">{m.id}</td>
                                        <td className="p-3 border border-gray-300 font-medium">{m.name}</td>
                                        <td className="p-3 border border-gray-300">{m.category_name}</td>
                                        <td className="p-3 border border-gray-300">Rp {m.price?.toLocaleString('id-ID')}</td>
                                        <td className="p-3 border border-gray-300 text-center">{m.stock}</td>
                                        <td className="p-3 border border-gray-300 max-w-xs">
                                            <div className="max-h-20 overflow-y-auto">
                                                {m.description || '-'}
                                            </div>
                                        </td>
                                        <td className="p-3 border border-gray-300">
                                            {m.sizes?.join(", ") || '-'}
                                        </td>
                                        <td className="p-3 border border-gray-300">
                                            {m.colors?.join(", ") || '-'}
                                        </td>
                                        <td className="p-3 border border-gray-300">
                                            {m.image && (
                                                <img
                                                    src={`http://localhost:8000/storage/${m.image}`}
                                                    alt={m.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                                                    }}
                                                />
                                            )}
                                        </td>
                                        <td className="p-3 border border-gray-300">
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleEditMerch(m)}
                                                    className="bg-yellow-400 px-3 py-1 rounded text-sm"
                                                    disabled={loading}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteMerch(m.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                                    disabled={loading}
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}