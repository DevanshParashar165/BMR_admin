import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useImages } from "../context/ImageContext";
import { Register as registerNewAdmin } from "../services/apiService";
import { useNavigate, Navigate, Link } from "react-router-dom";

export const Admin = () => {
    const { user, logout } = useAuth();
    const { images, upload, deleteImage, getAllImages, updateImage } = useImages();
    const navigate = useNavigate();

    // Upload Image States
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState("");

    // Add Admin States
    const [newAdminUsername, setNewAdminUsername] = useState("");
    const [newAdminEmail, setNewAdminEmail] = useState("");
    const [newAdminPassword, setNewAdminPassword] = useState("");
    const [adminLoading, setAdminLoading] = useState(false);
    const [adminError, setAdminError] = useState("");
    const [adminSuccess, setAdminSuccess] = useState("");

    // Edit Image States
    const [editingImage, setEditingImage] = useState(null);
    const [editCaption, setEditCaption] = useState("");
    const [editLoading, setEditLoading] = useState(false);

    useEffect(() => {
        getAllImages();
    }, []);

    // Route Protection (Client Side)
    if (!user || user.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadError("Please select an image file first.");
            return;
        }
        setUploadLoading(true);
        setUploadError("");
        setUploadSuccess("");

        const formData = new FormData();
        formData.append("image", file);
        formData.append("caption", caption);

        try {
            await upload(formData);
            setUploadSuccess("Image uploaded successfully!");
            setFile(null);
            setCaption("");
            // Refresh list
            getAllImages();
        } catch (err) {
            setUploadError(err.response?.data?.message || "Failed to upload image.");
        } finally {
            setUploadLoading(false);
        }
    };

    const handleAdminRegister = async (e) => {
        e.preventDefault();
        setAdminLoading(true);
        setAdminError("");
        setAdminSuccess("");

        try {
            await registerNewAdmin(newAdminUsername, newAdminEmail, newAdminPassword, "admin");
            setAdminSuccess(`Admin account "${newAdminUsername}" registered successfully!`);
            setNewAdminUsername("");
            setNewAdminEmail("");
            setNewAdminPassword("");
        } catch (err) {
            setAdminError(err.response?.data?.message || "Failed to register admin.");
        } finally {
            setAdminLoading(false);
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this image from the gallery?")) {
            try {
                await deleteImage(id);
            } catch (err) {
                alert(err.response?.data?.message || "Failed to delete image.");
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingImage) return;
        setEditLoading(true);
        try {
            await updateImage(editingImage._id, editCaption);
            setEditingImage(null);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update image.");
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-amber-950 via-neutral-900 to-orange-950 text-white select-none overflow-x-hidden pb-16">

            {/* Background Mandala Animation overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                <svg className="w-[800px] h-[800px] text-amber-500 animate-[spin_180s_linear_infinite]" fill="currentColor" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1,2" />
                    {[...Array(24)].map((_, i) => (
                        <path key={i} d="M50 50 L50 6" transform={`rotate(${i * 15} 50 50)`} stroke="currentColor" strokeWidth="0.2" />
                    ))}
                    {[...Array(12)].map((_, i) => (
                        <circle key={i} cx="50" cy="15" r="3" transform={`rotate(${i * 30} 50 50)`} fill="currentColor" />
                    ))}
                </svg>
            </div>

            {/* Header section with branding and Navigation Back */}
            <header className="relative z-10 w-full bg-black/40 border-b border-amber-500/10 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30">
                        <div className="absolute top-1 w-2.5 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full animate-pulse"></div>
                        <svg className="w-7 h-7 text-amber-600 mt-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2 14c0 3.87 3.13 7 7 7h6c3.87 0 7-3.13 7-7 0-3.36-2.36-6.19-5.5-6.86V6h-3v1.14C10.36 7.81 8 10.64 8 14H2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-wider text-amber-500 font-serif">प्रशासनिक पटल</h1>
                        <p className="text-[10px] text-amber-600/70 tracking-widest uppercase font-medium">BMR Mandir Admin Portal</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-amber-500 text-xs font-semibold tracking-wide bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-xl capitalize">
                        Admin: {user?.username}
                    </span>
                    <button
                        onClick={logout}
                        className="text-white text-xs font-semibold bg-red-950/40 border border-red-500/20 hover:bg-red-500/30 active:scale-95 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-red-900/10 flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Form Col 1: Upload Image */}
                <div className="bg-neutral-900/60 border border-amber-500/15 rounded-3xl p-6 backdrop-blur-xl shadow-lg h-fit ali">
                    <h2 className="text-lg font-bold text-amber-500 tracking-wide font-serif mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Image
                    </h2>

                    {uploadError && (
                        <div className="p-3 mb-4 bg-red-950/45 border border-red-500/25 rounded-xl text-red-400 text-xs">
                            {uploadError}
                        </div>
                    )}
                    {uploadSuccess && (
                        <div className="p-3 mb-4 bg-emerald-950/45 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs">
                            {uploadSuccess}
                        </div>
                    )}

                    <form onSubmit={handleUploadSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                                Image File
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-600/10 file:text-amber-500 hover:file:bg-amber-600/20 file:cursor-pointer file:transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                                Caption / Description
                            </label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                rows="3"
                                placeholder="Enter a beautiful description of the image"
                                className="w-full px-4 py-3 bg-black/40 border border-amber-500/10 focus:border-amber-500/40 rounded-xl text-white text-xs outline-none transition-all placeholder:text-neutral-600 resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={uploadLoading}
                            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {uploadLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Uploading...
                                </>
                            ) : (
                                "Publish to Gallery"
                            )}
                        </button>
                    </form>
                </div>

                {/* Form Col 2: Add New Admin */}
                {/* <div className="bg-neutral-900/60 border border-amber-500/15 rounded-3xl p-6 backdrop-blur-xl shadow-lg h-fit">
                    <h2 className="text-lg font-bold text-amber-500 tracking-wide font-serif mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Add New Admin
                    </h2>
                    
                    {adminError && (
                        <div className="p-3 mb-4 bg-red-950/45 border border-red-500/25 rounded-xl text-red-400 text-xs">
                            {adminError}
                        </div>
                    )}
                    {adminSuccess && (
                        <div className="p-3 mb-4 bg-emerald-950/45 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs">
                            {adminSuccess}
                        </div>
                    )}

                    <form onSubmit={handleAdminRegister} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                                Admin Username
                            </label>
                            <input
                                type="text"
                                required
                                value={newAdminUsername}
                                onChange={(e) => setNewAdminUsername(e.target.value)}
                                placeholder="Enter username"
                                className="w-full px-4 py-2.5 bg-black/40 border border-amber-500/10 focus:border-amber-500/40 rounded-xl text-white text-xs outline-none transition-all placeholder:text-neutral-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={newAdminEmail}
                                onChange={(e) => setNewAdminEmail(e.target.value)}
                                placeholder="Enter email address"
                                className="w-full px-4 py-2.5 bg-black/40 border border-amber-500/10 focus:border-amber-500/40 rounded-xl text-white text-xs outline-none transition-all placeholder:text-neutral-600"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                                Secure Password
                            </label>
                            <input
                                type="password"
                                required
                                value={newAdminPassword}
                                onChange={(e) => setNewAdminPassword(e.target.value)}
                                placeholder="Create secure password"
                                className="w-full px-4 py-2.5 bg-black/40 border border-amber-500/10 focus:border-amber-500/40 rounded-xl text-white text-xs outline-none transition-all placeholder:text-neutral-600"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={adminLoading}
                            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {adminLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Registering...
                                </>
                            ) : (
                                "Register Admin"
                            )}
                        </button>
                    </form>
                </div> */}

                {/* Form Col 3: Manage Gallery */}
                <div className="lg:col-span-3 bg-neutral-900/60 border border-amber-500/15 rounded-3xl p-6 backdrop-blur-xl shadow-lg mt-4">
                    <h2 className="text-lg font-bold text-amber-500 tracking-wide font-serif mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Manage Image Gallery ({images.length} images)
                    </h2>

                    {images.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-amber-500/10 rounded-2xl bg-black/20">
                            <p className="text-neutral-500 text-sm">No images in the gallery yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {images.map((image) => (
                                <div key={image._id} className="relative group aspect-square rounded-2xl overflow-hidden border border-white/5 bg-black/40">
                                    <img
                                        src={image.secure_url}
                                        alt={image.caption}
                                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                                    />

                                    {/* Glassmorphic edit/delete overlay on hover */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-2">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => {
                                                setEditingImage(image);
                                                setEditCaption(image.caption || "");
                                            }}
                                            className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-500 active:scale-95 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                                            title="Edit caption"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteClick(image._id)}
                                            className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                                            title="Delete image"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Brief caption text badge */}
                                    {image.caption && (
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                            <p className="text-[10px] text-white truncate text-center">{image.caption}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>

            {/* Edit Caption Modal */}
            {editingImage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-amber-500/20 rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-fade-in-custom">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-t-3xl"></div>
                        
                        <h3 className="text-lg font-bold text-amber-500 font-serif mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Image Caption
                        </h3>
                        
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <img 
                                    src={editingImage.secure_url} 
                                    alt="Preview" 
                                    className="w-full h-48 object-cover rounded-2xl border border-white/5 bg-black/30 mb-4"
                                />
                                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                                    Caption / Description
                                </label>
                                <textarea
                                    value={editCaption}
                                    onChange={(e) => setEditCaption(e.target.value)}
                                    rows="3"
                                    placeholder="Enter a beautiful description of the image"
                                    className="w-full px-4 py-3 bg-black/40 border border-amber-500/10 focus:border-amber-500/40 rounded-xl text-white text-xs outline-none transition-all placeholder:text-neutral-600 resize-none"
                                ></textarea>
                            </div>
                            
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingImage(null)}
                                    className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                                >
                                    {editLoading ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
