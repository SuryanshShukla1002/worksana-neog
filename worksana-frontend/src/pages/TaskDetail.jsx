import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FolderPlus,
  Users,
  Settings,
  FileText,
  Briefcase,
  CheckSquare,
  Clock,
  User,
  Tag,
  Edit,
  Save,
  X,
  FolderKanban,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TaskDetail = () => {
  const { detailId } = useParams();
  const [eachTaskDetail, setEachTaskDetail] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    name: "",
    status: "",
    timeToComplete: "",
    tags: "",
  });

  const getEachTaskDetail = async () => {
    try {
      const res = await fetch(
        `https://workasana-seven.vercel.app/api/task/tasks/${detailId}`,
        { credentials: "include" },
      );

      if (!res.ok) {
        console.log("Error in fetching each task detail");
        return;
      }
      const data = await res.json();
      setEachTaskDetail(data);
      setEditTaskData({
        name: data.name || "",
        status: data.status || "",
        timeToComplete: data.timeToComplete || "",
        tags: data.tags || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskDetail = async () => {
    try {
      const res = await fetch(
        `https://workasana-seven.vercel.app/api/task/tasks/${detailId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(editTaskData),
        },
      );

      if (!res.ok) {
        console.log("Error updating task");
        return;
      }

      await getEachTaskDetail();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditTaskData({
      name: eachTaskDetail.name || "",
      status: eachTaskDetail.status || "",
      timeToComplete: eachTaskDetail.timeToComplete || "",
      tags: eachTaskDetail.tags || "",
    });
    setIsEditing(false);
  };

  useEffect(() => {
    getEachTaskDetail();
  }, [detailId]);

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
                    <LayoutDashboard className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Back to Dashboard
                    </span>
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/task" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <FolderKanban className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Add new Task
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto mt-16 md:mt-0">
            <div className="mb-8">
              <Link to="/task-list">
                <Button variant="ghost" className="mb-4 group cursor-pointer">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:text-orange-500 transition-colors" />
                  <span className="group-hover:text-orange-500 transition-colors">
                    Back to Tasks
                  </span>
                </Button>
              </Link>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">Task Details</h1>
                    <Badge
                      variant={
                        eachTaskDetail.status === "Completed"
                          ? "default"
                          : eachTaskDetail.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {eachTaskDetail.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    View and manage task information
                  </p>
                </div>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="gap-2 cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Task
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={updateTaskDetail}
                      className="gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="gap-2 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Task Details Card */}
            {!isEditing ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {eachTaskDetail.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                          <FolderKanban className="w-4 h-4 text-orange-500" />
                          Project
                        </div>
                        <p className="text-lg">
                          {eachTaskDetail.project?.name ||
                            "No project assigned"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                          <Users className="w-4 h-4 text-orange-500" />
                          Team
                        </div>
                        <p className="text-lg">
                          {eachTaskDetail.team?.name || "No team assigned"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                          <User className="w-4 h-4 text-orange-500" />
                          Owners
                        </div>
                        <p className="text-lg">
                          {eachTaskDetail.owners?.length > 0
                            ? eachTaskDetail.owners
                                .map((owner) => owner.name)
                                .join(", ")
                            : "No owners assigned"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                          <Clock className="w-4 h-4 text-orange-500" />
                          Time to Complete
                        </div>
                        <p className="text-lg">
                          {eachTaskDetail.timeToComplete} days
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                          <Tag className="w-4 h-4 text-orange-500" />
                          Tags
                        </div>
                        <Badge variant="secondary">
                          {eachTaskDetail.tags || "No tags"}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                          <CheckSquare className="w-4 h-4 text-orange-500" />
                          Status
                        </div>
                        <Badge
                          variant={
                            eachTaskDetail.status === "Completed"
                              ? "default"
                              : eachTaskDetail.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {eachTaskDetail.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Edit Mode
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Edit Task</CardTitle>
                  <CardDescription>
                    Update task information below
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Task Name */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-orange-500" />
                        Task Name
                      </Label>
                      <Input
                        className="h-11"
                        value={editTaskData.name}
                        onChange={(e) =>
                          setEditTaskData({
                            ...editTaskData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Status */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-orange-500" />
                          Status
                        </Label>
                        <Select
                          value={editTaskData.status}
                          onValueChange={(value) =>
                            setEditTaskData({
                              ...editTaskData,
                              status: value,
                            })
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select status" />
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

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          Time to Complete (Days)
                        </Label>
                        <Input
                          className="h-11"
                          type="number"
                          value={editTaskData.timeToComplete}
                          onChange={(e) =>
                            setEditTaskData({
                              ...editTaskData,
                              timeToComplete: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-500" />
                        Tags
                      </Label>
                      <Select
                        value={editTaskData.tags}
                        onValueChange={(value) =>
                          setEditTaskData({
                            ...editTaskData,
                            tags: value,
                          })
                        }
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select tag" />
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
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskDetail;
