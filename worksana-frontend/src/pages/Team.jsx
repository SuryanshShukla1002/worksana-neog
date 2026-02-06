import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FolderPlus,
  Users,
  Settings,
  FileText,
  Briefcase,
  UserPlus,
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

const Team = () => {
  const [addTeam, setAddTeam] = useState({
    name: "",
    description: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmitTeam = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://workasana-seven.vercel.app/api/team/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(addTeam),
      });
      if (!res.ok) {
        console.log("Failed to create team");
        return;
      }
      setTimeout(() => {
        setAddTeam({ name: "", description: "" });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-muted/45">
      {/* Mobile Menu Button */}
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

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group">
                    <ArrowLeft className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Back to Dashboard
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/task" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group">
                    <Briefcase className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Add Task
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link
                  to="/project-create"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group">
                    <FolderPlus className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Add Project
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/settings" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group">
                    <Settings className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Settings
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t">
            <ThemeToggle />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex justify-center items-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-2xl mt-16 md:mt-0">
            <Card className="border-2">
              <CardHeader className="space-y-1 pb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 bg-orange-100 dark:bg-orange-950 rounded-full">
                    <UserPlus className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
                  Create New Team
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Build your team and collaborate effectively
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmitTeam}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-500" />
                        Team Name
                      </Label>
                      <Input
                        className="h-11"
                        placeholder="Enter team name"
                        value={addTeam.name}
                        onChange={(e) =>
                          setAddTeam({ ...addTeam, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-orange-500" />
                        Team Description
                      </Label>
                      <Textarea
                        className="min-h-[120px] resize-none"
                        placeholder="Describe your team's purpose and responsibilities..."
                        value={addTeam.description}
                        onChange={(e) =>
                          setAddTeam({
                            ...addTeam,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Help team members understand the team's role and
                        objectives
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-6 h-11 text-base font-semibold cursor-pointer"
                    >
                      Create Team
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

export default Team;
