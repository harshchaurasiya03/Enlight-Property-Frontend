import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaListUl,
  FaHeading,
  FaParagraph,
  FaEdit,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

type ContentBlock =
  | { type: "sectionTitle"; value: string }
  | { type: "paragraph"; value: string }
  | { type: "bullets"; value: string[] };

type Blog = {
  id: number;
  title: string;
  subTitle: string;
  status: "draft" | "published";
  content: ContentBlock[];
};

const BlogDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [formState, setFormState] = useState<{
    id: number | null;
    title: string;
    subTitle: string;
    status: "draft" | "published";
    content: ContentBlock[];
    file: File | null;
  }>({
    id: null,
    title: "",
    subTitle: "",
    status: "draft",
    content: [],
    file: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [feedback, setFeedback] = useState<{
    success: string | null;
    error: string | null;
  }>({ success: null, error: null });

  // Input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // File change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormState((prev) => ({ ...prev, file }));
  };

  // Add new content block
  const addContentBlock = (type: "sectionTitle" | "paragraph" | "bullets") => {
    let newBlock: ContentBlock;
    if (type === "bullets") newBlock = { type, value: [""] };
    else newBlock = { type, value: "" };
    setFormState((prev) => ({ ...prev, content: [...prev.content, newBlock] }));
  };

  // Update content block value
  const updateContentValue = (
    index: number,
    value: string,
    bulletIndex: number | null = null
  ) => {
    setFormState((prev) => {
      const updated = [...prev.content];
      const block = updated[index];
      if (block.type === "bullets" && bulletIndex !== null) {
        const newBullets = [...block.value];
        newBullets[bulletIndex] = value;
        updated[index] = { ...block, value: newBullets };
      } else if (block.type !== "bullets") {
        updated[index] = { ...block, value };
      }
      return { ...prev, content: updated };
    });
  };

  // Add bullet to bullets block
  const addBullet = (index: number) => {
    setFormState((prev) => {
      const updated = [...prev.content];
      const block = updated[index];
      if (block.type === "bullets") {
        updated[index] = { ...block, value: [...block.value, ""] };
      }
      return { ...prev, content: updated };
    });
  };

  // Remove bullet
  const removeBullet = (index: number, bulletIndex: number) => {
    setFormState((prev) => {
      const updated = [...prev.content];
      const block = updated[index];
      if (block.type === "bullets") {
        updated[index] = {
          ...block,
          value: block.value.filter((_, i) => i !== bulletIndex),
        };
      }
      return { ...prev, content: updated };
    });
  };

  // Delete content block
  const deleteBlock = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormState({
      id: null,
      title: "",
      subTitle: "",
      status: "draft",
      content: [],
      file: null,
    });
    setIsEditing(false);
    setFeedback({ success: null, error: null });
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.subTitle) {
      setFeedback({ success: null, error: "Title and subtitle are required" });
      return;
    }

    if (isEditing && formState.id !== null) {
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === formState.id
            ? {
                id: b.id, // keep id as number
                title: formState.title,
                subTitle: formState.subTitle,
                status: formState.status,
                content: formState.content,
              }
            : b
        )
      );
      setFeedback({ success: "Blog updated", error: null });
    } else {
      const newBlog: Blog = {
        id: Date.now(),
        title: formState.title,
        subTitle: formState.subTitle,
        status: formState.status,
        content: formState.content,
      };
      setBlogs((prev) => [...prev, newBlog]);
      setFeedback({ success: "Blog created", error: null });
    }
    resetForm();
  };

  // Edit blog
  const handleEdit = (blog: Blog) => {
    setFormState({ ...blog, file: null });
    setIsEditing(true);
    setFeedback({ success: null, error: null });
  };

  // Delete blog
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    setFeedback({ success: "Blog deleted", error: null });
  };

  // Toggle expand row
  const toggleExpand = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Blog Dashboard</h2>
        <nav className="text-sm text-gray-500">Home / Blog Dashboard</nav>
      </div>

      {/* Feedback */}
      {feedback.error && <p className="text-red-500 mb-2">{feedback.error}</p>}
      {feedback.success && (
        <p className="text-blue-500 mb-2">{feedback.success}</p>
      )}

      {/* Blog Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {isEditing ? "Edit Blog" : "Create Blog"}
        </h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Title</label>
              <input
                type="text"
                name="title"
                value={formState.title}
                onChange={handleInputChange}
                placeholder="Enter title"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Sub Title</label>
              <input
                type="text"
                name="subTitle"
                value={formState.subTitle}
                onChange={handleInputChange}
                placeholder="Enter subtitle"
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Status & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Status</label>
              <select
                name="status"
                value={formState.status}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-600">Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Content Builder */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-gray-700 flex items-center gap-2">
              Content Builder
            </h4>
            {formState.content.map((block, index) => (
              <div
                key={index}
                className="border rounded-2xl p-4 mb-3 bg-gray-50 flex flex-col gap-3"
              >
                <button
                  type="button"
                  onClick={() => deleteBlock(index)}
                  className="flex text-red-500 hover:text-red-700 self-end"
                >
                  <FaTrash />
                </button>

                {block.type === "sectionTitle" && (
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-blue-700">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={block.value}
                      onChange={(e) =>
                        updateContentValue(index, e.target.value)
                      }
                      placeholder="Enter section title"
                      className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    />
                  </div>
                )}
                {block.type === "paragraph" && (
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-blue-300">
                      Paragraph
                    </label>
                    <textarea
                      value={block.value}
                      onChange={(e) =>
                        updateContentValue(index, e.target.value)
                      }
                      placeholder="Write paragraph..."
                      className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
                      rows={3}
                    />
                  </div>
                )}
                {block.type === "bullets" && (
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-blue-700">
                      Bullets
                    </label>
                    {block.value.map((bullet, bIndex) => (
                      <div key={bIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) =>
                            updateContentValue(index, e.target.value, bIndex)
                          }
                          placeholder="Enter bullet"
                          className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
                        />
                        <button
                          type="button"
                          onClick={() => removeBullet(index, bIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addBullet(index)}
                      className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
                    >
                      <FaPlus /> Add Bullet
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => addContentBlock("sectionTitle")}
                className="bg-blue-500 text-black px-3 py-2 rounded-xl flex items-center gap-1 hover:bg-blue-600"
              >
                <FaHeading /> Add Section Title
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("paragraph")}
                className="bg-blue-500 text-black px-3 py-2 rounded-xl flex items-center gap-1 hover:bg-blue-600"
              >
                <FaParagraph /> Add Paragraph
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("bullets")}
                className="bg-blue-500 text-black px-3 py-2 rounded-xl flex items-center gap-1 hover:bg-blue-600"
              >
                <FaListUl /> Add Bullets
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-6 flex gap-4 justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
            >
              {isEditing ? "Update Blog" : "Create Blog"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 px-6 py-2 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Blogs Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 mt-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">All Blogs</h3>
        {blogs.length === 0 && <p>No blogs yet.</p>}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">SubTitle</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Blocks</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <React.Fragment key={blog.id}>
                <tr className="border-b">
                  <td className="p-3">{blog.id}</td>
                  <td className="p-3 max-w-[200px] truncate">{blog.title}</td>
                  <td className="p-3 max-w-[200px] truncate">
                    {blog.subTitle}
                  </td>
                  <td className="p-3">{blog.status}</td>
                  <td className="p-3">{blog.content.length} blocks</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => toggleExpand(blog.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {expandedRows.has(blog.id) ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedRows.has(blog.id) && (
                  <tr>
                    <td colSpan={6} className="bg-gray-50 p-3">
                      <pre className="whitespace-pre-wrap break-words">
                        {JSON.stringify(blog.content, null, 2)}
                      </pre>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogDashboard;
