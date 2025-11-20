import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux";
import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../../../redux/actions/subscribebannerAction";

export default function SubscribePopupDashboard() {
  const dispatch = useAppDispatch();
  const { banners, banner, loading, error } = useAppSelector(
    (s) => s.subscribeBanner
  );

  // ---------------- STATES ----------------
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");

  const [quoteText, setQuoteText] = useState("");
  const [status, setStatus] = useState("active");

  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  // ---------------- FETCH ALL ON LOAD ----------------
  useEffect(() => {
    dispatch(getAllBanners());
  }, []);

  // ---------------- LOAD EDIT DATA ----------------
  useEffect(() => {
    if (banner && isEditMode) {
      setQuoteText(banner.quote_text);
      setStatus(banner.status);
      setBannerPreview(banner.images?.[0]?.url || "");
    }
  }, [banner]);

  // ---------------- FILE CHANGE ----------------
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  // ---------------- SAVE / CREATE ----------------
  const handleSave = async () => {
    setSaving(true);

    const form = new FormData();
    form.append("quote_text", quoteText);
    form.append("status", status);
    if (bannerFile) form.append("image", bannerFile);

    // Close UI instantly
    closeForm();

    try {
      if (isEditMode && currentId) {
        dispatch(updateBanner(currentId, form));
      } else {
        dispatch(createBanner(form));
      }

      dispatch(getAllBanners());
    } finally {
      setSaving(false);
    }
  };

  // ---------------- RESET FORM ----------------
  const closeForm = () => {
    setShowForm(false);
    setIsEditMode(false);
    setCurrentId(null);
    setQuoteText("");
    setStatus("active");
    setBannerFile(null);
    setBannerPreview("");
  };

  // ---------------- EDIT ----------------
  const handleEdit = async (id: string) => {
    setIsEditMode(true);
    setCurrentId(id);
    setShowForm(true);

    dispatch(getBannerById(id));
  };

  // ---------------- DELETE ----------------
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    await dispatch(deleteBanner(deleteTarget._id));
    await dispatch(getAllBanners());

    setDeleteTarget(null);
  };

  // Media URL builder
  const ASSET_URL = import.meta.env.VITE_ASSET_URL || "";
  const getMediaUrl = (url?: string) =>
    url?.startsWith("http") ? url : `${ASSET_URL}${url || ""}`;

  return (
    <div className="p-6">
      <div className="bg-white rounded-md shadow p-6 mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Subscribe Banner Management
          </h1>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowForm(true)}
          >
            + Create Banner
          </button>
        </div>

        {/* ERROR */}
        {error && <div className="text-red-600 mt-3">{error}</div>}

        {/* TABLE */}
        <div className="mt-6 border rounded-md overflow-hidden shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Banner Image</th>
                <th className="p-3 text-left">Quote Text</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {banners.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={getMediaUrl(b.images?.[0]?.url)}
                      className="w-24 h-16 rounded object-cover"
                    />
                  </td>

                  <td className="p-3">{b.quote_text}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-md text-white ${
                        b.status === "active" ? "bg-green-600" : "bg-gray-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(b.createdAt || "").toLocaleDateString()}
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      className="px-3 py-1 text-white bg-blue-500 rounded"
                      onClick={() => handleEdit(b._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 text-white bg-red-500 rounded"
                      onClick={() => setDeleteTarget(b)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {banners.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-5 text-center text-gray-500">
                    No banners found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* POPUP FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-md shadow-xl w-[500px]">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? "Edit Banner" : "Create Banner"}
              </h2>

              {/* File Upload */}
              <div>
                <label className="text-sm font-medium">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="mt-1 border w-full"
                />
                {bannerPreview && (
                  <img
                    src={
                      bannerPreview.startsWith("blob:")
                        ? bannerPreview
                        : getMediaUrl(bannerPreview)
                    }
                    className="mt-2 w-full h-40 object-cover rounded"
                  />
                )}
              </div>

              {/* Quote Text */}
              <div className="mt-3">
                <label className="text-sm font-medium">Quote Text</label>
                <input
                  type="text"
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  className="w-full mt-1 border px-3 py-2 rounded"
                  placeholder="Enter banner quote"
                />
              </div>

              {/* Status */}
              <div className="mt-3">
                <label className="text-sm font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border mt-1 px-3 py-2 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 text-white px-4 py-2 rounded flex-1 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : isEditMode
                    ? "Save Changes"
                    : "Create"}
                </button>

                <button
                  onClick={closeForm}
                  className="bg-gray-300 text-black px-4 py-2 rounded flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRM MODAL */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-2">Delete Banner</h2>

              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.quote_text}</strong>?
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 bg-gray-300 rounded-md flex-1"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
