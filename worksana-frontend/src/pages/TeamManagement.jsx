import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Plus,
  FolderKanban,
  Menu,
  X,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getAllTeams = async () => {
    try {
      const res = await fetch(
        "https://workasana-seven.vercel.app/api/team/teams",
        {
          credentials: "include",
        },
      );

      if (!res.ok) {
        console.log("Failed to fetch the teams data");
        return;
      }
      const data = await res.json();
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeams();
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
                    <LayoutDashboard className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Back to Dashboard
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link
                  to="/project-list"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <FolderKanban className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Projects
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/team-manage" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <Users className="w-5 h-5 text-orange-500 transition-colors" />
                    <span className="text-orange-500 transition-colors">
                      Teams
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto mt-16 md:mt-0">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Team Management
                  </h1>
                  <p className="text-muted-foreground">
                    View and manage all your teams
                  </p>
                </div>

                <Link to="/team-create">
                  <Button className="gap-2 cursor-pointer w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    Add New Team
                  </Button>
                </Link>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {teams && teams.length > 0 ? (
                teams.map((team) => (
                  <Card
                    key={team._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-950 rounded-lg">
                          <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <Badge variant="secondary">Team</Badge>
                      </div>

                      <CardTitle className="text-xl mb-2">
                        {team.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {team.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="md:col-span-2">
                  <Card className="p-12">
                    <div className="text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">
                        No teams yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Get started by creating your first team
                      </p>
                      <Link to="/team-create">
                        <Button className="gap-2 cursor-pointer">
                          <Plus className="w-4 h-4" />
                          Create Team
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeamManagement;
