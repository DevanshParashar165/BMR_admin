import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, Navigate } from "react-router-dom";

export const Register = () => {
    const { user, register } = useAuth();
    const navigate = useNavigate();

    // Redirect already authenticated admin to dashboard
    if (user && user.role === "admin") {
        return <Navigate to="/" replace />;
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(username, email, password, role);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-amber-950 via-neutral-900 to-orange-950 px-4 py-12 overflow-hidden select-none">
            {/* Traditional Mandala Background Vector Effect (Saffron/Golden Opacity) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                <svg className="w-[600px] h-[600px] text-amber-500 animate-[spin_120s_linear_infinite]" fill="currentColor" viewBox="0 0 100 100">
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

            {/* Glowing Golden Diya (Oil Lamp) & Card Container */}
            <div className="relative w-full max-w-md bg-neutral-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(249,115,22,0.15)] text-center">
                
                {/* Traditional Decorative Top Border */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-t-3xl"></div>

                {/* Diya SVG Icon - Themed Traditional Indian Lamp */}
                <div className="flex justify-center mb-6 mt-2">
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                        {/* Flame */}
                        <div className="absolute top-2 w-4 h-7 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[1px] animate-[pulse_1.5s_infinite_ease-in-out]"></div>
                        {/* Flame Glow */}
                        <div className="absolute top-1 w-6 h-9 bg-amber-500/30 rounded-full blur-md animate-ping"></div>
                        {/* Lamp Body */}
                        <svg className="w-12 h-12 text-amber-600 mt-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2 14c0 3.87 3.13 7 7 7h6c3.87 0 7-3.13 7-7 0-3.36-2.36-6.19-5.5-6.86V6h-3v1.14C10.36 7.81 8 10.64 8 14H2z" />
                        </svg>
                    </div>
                </div>

                {/* Heading (Indian cultural welcome phrase) */}
                <h2 className="text-2xl font-bold tracking-wide text-amber-500 uppercase font-serif">
                    पंजीकरणम्‌
                </h2>
                <p className="text-xs text-amber-600/70 tracking-widest uppercase mt-0.5 font-medium">
                    Register to BMR Portal
                </p>
                <h3 className="text-white font-semibold text-lg mt-3">
                    Create New Account
                </h3>

                {/* Error Banner */}
                {error && (
                    <div className="mt-4 p-3 bg-red-950/50 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium text-left">
                        {error}
                    </div>
                )}

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
                    <div>
                        <label className="block text-xs font-semibold text-amber-500/80 uppercase tracking-wider mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full px-4 py-2.5 bg-black/40 border border-amber-500/10 focus:border-amber-500/40 rounded-xl text-white text-sm outline-none transition-all placeholder:text-neutral-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-amber-500/80 uppercase tracking-wider mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="w-full px-4 py-2.5 bg-black/40 border border-amber-500/10 focus:border-amber-500/40 rounded-xl text-white text-sm outline-none transition-all placeholder:text-neutral-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-amber-500/80 uppercase tracking-wider mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create secure password"
                            className="w-full px-4 py-2.5 bg-black/40 border border-amber-500/10 focus:border-amber-500/40 rounded-xl text-white text-sm outline-none transition-all placeholder:text-neutral-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-amber-500/80 uppercase tracking-wider mb-1">
                            User Role
                        </label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                    role === "user"
                                        ? "bg-amber-600/20 border-amber-500 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                                        : "bg-black/20 border-amber-500/10 text-neutral-400 hover:border-amber-500/30"
                                }`}
                            >
                                Devotee (User)
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("admin")}
                                className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                    role === "admin"
                                        ? "bg-amber-600/20 border-amber-500 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                                        : "bg-black/20 border-amber-500/10 text-neutral-400 hover:border-amber-500/30"
                                }`}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.35)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Registering...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* Traditional Footer link */}
                <p className="mt-6 text-xs text-neutral-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-amber-500 hover:underline font-medium">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};
