import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Settings,
  Plus,
  Clock,
  User,
  Filter,
  X,
  Menu,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectManage = () => {
  const { projectId } = useParams();
  const [eachProjectData, setEachProjectData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleEachProject = async () => {
    try {
      const res = await fetch(
        `https://workasana-seven.vercel.app/api/project/getProject/${projectId}`,
        { credentials: "include" },
      );
      if (!res.ok) return;
      const data = await res.json();
      setEachProjectData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(
        "https://workasana-seven.vercel.app/api/project/projects",
        {
          credentials: "include",
        },
      );
      if (!res.ok) return;
      const data = await res.json();
      setProjectData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOwners = async () => {
    try {
      const res = await fetch(
        "https://workasana-seven.vercel.app/api/users/user",
        {
          credentials: "include",
        },
      );
      if (!res.ok) return;
      const data = await res.json();
      setOwners(data);
    } catch (error) {
      console.log(error);
    }
  };

  const currentProject = projectData.find((p) => p._id === projectId);

  const filteredTasks = eachProjectData.filter((task) => {
    const ownerOk = selectedOwner
      ? task.owners?.some((o) => o._id === selectedOwner)
      : true;
    const statusOk = selectedStatus ? task.status === selectedStatus : true;
    return ownerOk && statusOk;
  });

  const clearFilters = () => {
    setSelectedOwner("");
    setSelectedStatus("");
  };

  useEffect(() => {
    handleEachProject();
    fetchProjects();
    getOwners();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-muted/45">
      <div className="flex min-h-screen relative">
        {/* ✅ MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-card shadow"
        >
          <Menu className="w-5 h-5" />
        </button>

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
          />
        )}

        <aside
          className={`w-64 border-r bg-card shadow-sm flex-col
          fixed md:static top-0 left-0 h-screen z-50
          transition-transform duration-300
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              WorkSana
            </h2>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-t">
            <ThemeToggle />
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-sm font-medium cursor-pointer">
                    <LayoutDashboard className="w-5 h-5" />
                    Back to Dashboard
                  </button>
                </Link>
              </li>

              <li>
                <Link
                  to="/project-create"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-sm font-medium cursor-pointer">
                    <CheckSquare className="w-5 h-5" />
                    Add new Project
                  </button>
                </Link>
              </li>

              <li>
                <Link
                  to="/project-list"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-sm font-medium cursor-pointer">
                    <Users className="w-5 h-5" />
                    Projects
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* ✅ MAIN CONTENT (UNCHANGED) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Project: {currentProject?.name || "Loading..."}
                  </h1>
                  <p className="text-muted-foreground">
                    Manage and track all tasks for this project
                  </p>
                </div>

                <Link to="/task">
                  <Button className="gap-2 w-full sm:w-auto cursor-pointer">
                    <Plus className="w-4 h-4" />
                    Add New Task
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="mb-6 border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold">Filter Tasks</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Owner</Label>
                    <Select
                      value={selectedOwner}
                      onValueChange={setSelectedOwner}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        {owners.map((o) => (
                          <SelectItem key={o._id} value={o._id}>
                            {o.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {(selectedOwner || selectedStatus) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="mt-4 w-fit cursor-pointer"
                  >
                    Clear Filters
                  </Button>
                )}
              </CardHeader>
            </Card>

            <h2 className="text-xl font-semibold mb-4">
              Tasks ({filteredTasks.length})
            </h2>

            {filteredTasks.map((task) => (
              <Card key={task._id} className="mb-4">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle>{task.name}</CardTitle>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {task?.owners?.[0]?.name ?? "Unassigned"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.timeToComplete} days
                      </span>
                    </div>
                  </div>
                  <Badge>{task.status}</Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectManage;
