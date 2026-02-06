import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FolderPlus,
  Users,
  Settings,
  CheckCircle2,
  Clock,
  Tag,
  Menu,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TaskCreation = () => {
  const [team, setTeam] = useState([]);
  const [project, setProject] = useState([]);
  const [owners, setOwners] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    project: "",
    team: "",
    owners: "",
    tags: "",
    timeToComplete: 1,
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createNewtask = await fetch(
        "https://workasana-seven.vercel.app/api/task/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(taskData),
        },
      );
      if (!createNewtask.ok) return;
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

  const getTeam = async () => {
    try {
      const res = await fetch(
        "https://workasana-seven.vercel.app/api/team/teams",
        {
          credentials: "include",
        },
      );
      if (!res.ok) return;
      const data = await res.json();
      setTeam(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async () => {
    try {
      const res = await fetch(
        "https://workasana-seven.vercel.app/api/project/projects",
        {
          credentials: "include",
        },
      );
      if (!res.ok) return;
      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeam();
    getProject();
    getOwners();
  }, []);

  return (
    <div className="min-h-screen bg-muted/45">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-40
            w-64 border-r bg-card shadow-sm flex flex-col
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              WorkSana
            </h2>
          </div>

          <div className="ml-4 mt-4">
            <ThemeToggle />
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <ArrowLeft className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Back to Dashboard
                    </span>
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to="/project-create"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <FolderPlus className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Add Project
                    </span>
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/team-create" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <Users className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Add Team
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex justify-center items-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-2xl mt-16 md:mt-0">
            <Card className="border-2">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
                  Create New Task
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Fill in the details to create a new task for your team
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange-500" />
                        Task Name
                      </Label>
                      <Input
                        className="h-11"
                        placeholder="Enter task name"
                        onChange={(e) =>
                          setTaskData({ ...taskData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <FolderPlus className="w-4 h-4 text-orange-500" />
                          Project
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setTaskData({ ...taskData, project: value })
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Choose project" />
                          </SelectTrigger>
                          <SelectContent>
                            {project.map((eachProject) => (
                              <SelectItem
                                key={eachProject._id}
                                value={eachProject._id}
                              >
                                {eachProject.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4 text-orange-500" />
                          Team
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setTaskData({ ...taskData, team: value })
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Choose team" />
                          </SelectTrigger>
                          <SelectContent>
                            {team.map((teams) => (
                              <SelectItem key={teams._id} value={teams._id}>
                                {teams.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        Assign Owner
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setTaskData({ ...taskData, owners: value })
                        }
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select owner" />
                        </SelectTrigger>
                        <SelectContent>
                          {owners.map((eachOwner) => (
                            <SelectItem
                              key={eachOwner._id}
                              value={eachOwner._id}
                            >
                              {eachOwner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          Time to Complete (Days)
                        </Label>
                        <Input
                          className="h-11"
                          type="number"
                          min="1"
                          placeholder="e.g. 5"
                          onChange={(e) =>
                            setTaskData({
                              ...taskData,
                              timeToComplete: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-orange-500" />
                          Status
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setTaskData({ ...taskData, status: value })
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Choose status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Blocked">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-500" />
                        Tags
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setTaskData({ ...taskData, tags: value })
                        }
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Choose tag" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Follow Up">Follow Up</SelectItem>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                          <SelectItem value="High Priority">
                            High Priority
                          </SelectItem>
                          <SelectItem value="Low Priority">
                            Low Priority
                          </SelectItem>
                          <SelectItem value="Bug">Bug</SelectItem>
                          <SelectItem value="Feature">Feature</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-6 h-11 text-base font-semibold cursor-pointer"
                    >
                      Create Task
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskCreation;
