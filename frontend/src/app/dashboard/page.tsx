"use client";
import { useEffect, useState } from "react";
import { API } from "../../lib/api";
import { useRouter } from "next/navigation";

// A modern, elegant color palette
const theme = {
  bg: "bg-[#F7F4EF]",
  text: "text-[#333333]",
  accent: "text-[#C77D6B]",
  primary: "bg-[#C77D6B] hover:bg-[#A6604F]",
  secondary: "bg-[#F0EAE3] text-[#333333] border border-[#D3CBC2] hover:bg-[#E6DDD3]",
  card: "bg-white shadow-md rounded-lg",
  border: "border-[#D3CBC2]",
  danger: "bg-[#E74C3C] hover:bg-[#C0392B]",
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState<any>(null);
  
  // UI 
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Feature
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Form 
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.clear();
        router.push("/login");
      }
    } else {
      localStorage.clear();
      router.push("/login");
    }
    fetchTasks();
  }, [router]);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err: any) {
      showMessage(err.response?.data?.message || "Failed to load tasks", "error");
      if (err.response?.status === 401) router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/tasks/${editingId}`, { title, description, status });
        showMessage("Task updated successfully ✅", "success");
      } else {
        await API.post("/tasks", { title, description, status });
        showMessage("Task created successfully ✅", "success");
      }
      closeModal();
      fetchTasks();
    } catch (err: any) {
      showMessage(err.response?.data?.message || "Validation Error ⚠️", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      showMessage("Task deleted successfully 🗑️", "success");
      fetchTasks();
    } catch (err: any) {
      showMessage(err.response?.data?.message || "Failed to delete task ❌", "error");
    }
  };

  const openEditModal = (task: any) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const getStatusBadge = (status: string) => {
    const base = "inline-block px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "Completed": return `${base} bg-green-100 text-green-800`;
      case "In Progress": return `${base} bg-yellow-100 text-yellow-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
    }
  };

  
  const filteredTasks = tasks.filter((task: any) => {
    if (statusFilter === "All") return true;
    return task.status === statusFilter;
  });

  if (!user) return <div className={`min-h-screen ${theme.bg} flex items-center justify-center font-medium text-2xl text-gray-500`}>Loading Workspace...</div>;

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-serif antialiased`}>

      {message.text && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-md font-medium shadow-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

  
      <nav className={`sticky top-0 z-30 ${theme.bg} border-b ${theme.border} px-6 md:px-8 py-4 flex items-center justify-between`}>
        <h1 className={`text-2xl font-serif font-bold tracking-tight`}>My Workspace</h1>
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 focus:outline-none">
              <div className={`w-9 h-9 rounded-full ${theme.primary} flex items-center justify-center text-white font-medium text-lg shadow-sm`}>
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:inline font-medium text-sm font-sans">{user.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
 
            {isProfileOpen && (
              <div className={`absolute right-0 mt-2 w-64 ${theme.card} ${theme.border} border p-4 rounded-lg shadow-xl z-10 font-sans`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${theme.primary} flex items-center justify-center text-white font-medium text-xl`}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {user.role === 'admin' ? "👑 Administrator" : "👤 Standard User"}
                  </span>
                </div>
                <button onClick={handleLogout} className={`w-full ${theme.secondary} py-2 rounded-md font-medium transition-colors`}>
                  Log Out
                </button>
              </div>
            )}
          </div>
          <button onClick={() => setIsModalOpen(true)} className={`${theme.primary} text-white px-4 py-2 rounded-md font-sans font-medium text-sm shadow-sm transition-colors`}>
            + Add Task
          </button>
        </div>
      </nav>


      <main className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold tracking-tight ${theme.accent}`}>
            {user.role === 'admin' ? "System Overview" : "Your Tasks"}
          </h2>
          <div className={`${theme.card} ${theme.border} border p-4 rounded-lg shadow-sm text-center min-w-[120px]`}>
            <h3 className="text-sm font-sans font-medium text-gray-500 mb-1">Total Tasks</h3>
            <p className={`text-3xl font-serif font-bold ${theme.accent}`}>{tasks.length}</p>
          </div>
        </div>


        <div className="flex flex-wrap gap-2 mb-8 font-sans">
          {["All", "Pending", "In Progress", "Completed"].map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                statusFilter === f
                  ? "bg-[#C77D6B] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-[#D3CBC2] hover:bg-[#F0EAE3]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>


        {isLoading ? (
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`bg-white border ${theme.border} p-6 rounded-lg shadow-sm h-[220px] flex flex-col justify-between`}>
                <div>
                  <div className="flex justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-10 bg-gray-100 rounded-md w-full mt-6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task: any) => (
                <div key={task._id} className={`${theme.card} ${theme.border} border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[200px]`}>
                  <div>
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h3 className="text-xl font-serif font-medium leading-tight">{task.title}</h3>
                      <span className={`${getStatusBadge(task.status)} whitespace-nowrap`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-gray-600 font-sans text-sm leading-relaxed line-clamp-3">{task.description}</p>
                    
  
                    {user.role === 'admin' && task.user && (
                      <p className="text-xs font-sans font-medium text-gray-500 mt-4 pt-4 border-t border-gray-100">
                        Created by: <span className="text-[#C77D6B]">
                          {typeof task.user === 'object' ? task.user.email : task.user}
                        </span>
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3 font-sans">
                    <button onClick={() => openEditModal(task)} className={`${theme.secondary} px-4 py-2 rounded-md font-medium text-sm transition-colors`}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task._id)} className={`${theme.danger} text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm transition-colors`}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={`col-span-full p-12 ${theme.card} ${theme.border} border text-center rounded-lg shadow-sm flex flex-col items-center justify-center text-gray-500`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h2 className="text-lg font-serif font-medium">No tasks found</h2>
                <p className="text-sm font-sans mt-2">
                  {statusFilter !== "All" ? `You have no tasks marked as "${statusFilter}".` : "Create your first task to get started."}
                </p>
              </div>
            )}
          </div>
        )}
      </main>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
          <div className={`${theme.card} ${theme.border} border p-8 rounded-lg shadow-xl w-full max-w-md`}>
            <h2 className="text-2xl font-serif font-bold mb-6 text-gray-900">
              {editingId ? "Edit Task" : "New Task"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C77D6B] font-medium" placeholder="e.g. Project Plan" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C77D6B] resize-none h-24 font-medium text-sm leading-relaxed" placeholder="Add details..." required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C77D6B] appearance-none cursor-pointer font-medium">
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className={`flex-1 ${theme.secondary} py-3 rounded-md font-medium transition-colors`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 ${theme.primary} text-white py-3 rounded-md font-medium shadow-sm transition-colors`}>
                  {editingId ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}