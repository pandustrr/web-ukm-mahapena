import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  Tag,
  ChevronLeft,
  ChevronRight,
  Loader,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ManajemenBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const blogsPerPage = 8;

  // Data dummy untuk simulasi
  const dummyBlogs = [
    {
      id: 1,
      title: "Panduan Lengkap Web Development untuk Pemula",
      excerpt:
        "Belajar dasar-dasar web development dari HTML, CSS, hingga JavaScript...",
      author: "Ahmad Rizki",
      category: "Web Development",
      status: "published",
      publishedDate: "2024-02-15",
      views: 1245,
      likes: 89,
      comments: 23,
      image: "/api/placeholder/300/200",
    },
  ];

  useEffect(() => {
    // Simulasi fetching data dari API
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Di aplikasi nyata, ini akan berupa API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBlogs(dummyBlogs);
      } catch (err) {
        setError("Gagal memuat data blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs berdasarkan search dan status
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || blog.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleDelete = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedBlog) {
      setBlogs(blogs.filter((blog) => blog.id !== selectedBlog.id));
      setSuccess("Blog berhasil dihapus");
      setShowDeleteModal(false);
      setSelectedBlog(null);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "published":
        return "Published";
      case "draft":
        return "Draft";
      case "archived":
        return "Archived";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Blog</h1>
          <p className="text-gray-600">Kelola konten blog UKM</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 mt-4 sm:mt-0">
          <Plus size={18} />
          Tambah Blog
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari blog..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-800">{blogs.length}</div>
          <div className="text-gray-600">Total Blog</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-green-600">
            {blogs.filter((b) => b.status === "published").length}
          </div>
          <div className="text-gray-600">Published</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {blogs.filter((b) => b.status === "draft").length}
          </div>
          <div className="text-gray-600">Draft</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-600">
            {blogs.filter((b) => b.status === "archived").length}
          </div>
          <div className="text-gray-600">Archived</div>
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul Blog
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Penulis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                          {blog.image ? (
                            <img
                              className="h-10 w-10 object-cover"
                              src={blog.image}
                              alt={blog.title}
                            />
                          ) : (
                            <div className="h-10 w-10 bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                              No Img
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {blog.views} views • {blog.likes} likes
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{blog.author}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Tag size={12} className="mr-1" />
                        {blog.category}
                      </span>
                    </td>
                  </tr>
                ))
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-t">
                    <td className="px-4 py-2">{blog.title}</td>
                    <td className="px-4 py-2">{blog.category?.name || "-"}</td>
                    <td
                      className={`px-4 py-2 capitalize ${getStatusColor(blog.status)}`}
                    >
                      {blog.status}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <Link
                        to={`/admin/blogs/update/${blog.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                      <a
                        href={`/blog/${blog.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 p-1"
                        title="View"
                      >
                        <Eye size={16} />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Tidak ada data blog.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {currentBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              Tidak ada blog yang ditemukan
            </div>
            <div className="text-sm text-gray-500">
              Coba ubah filter atau kata kunci pencarian
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Menampilkan {indexOfFirstBlog + 1}-
                {Math.min(indexOfLastBlog, filteredBlogs.length)} dari{" "}
                {filteredBlogs.length} blog
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-1 rounded border border-gray-300 disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded text-sm ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-1 rounded border border-gray-300 disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Hapus Blog
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus blog "
              <strong>{selectedBlog.title}</strong>"? Tindakan ini tidak dapat
              dibatalkan.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenBlog;
