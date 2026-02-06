import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Setting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [project, setProject] = useState([]);

  const handleProjectFetch = async () => {
    try {
      const res = await fetch("https://workasana-seven.vercel.app/api/project/projects", {
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProjectFetch();
  }, []);

  return (
    <div className="flex min-h-screen">
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
        fixed md:static top-0 left-0 h-screen md:h-screen z-50
        transition-transform duration-300
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            WorkSana
          </h2>

          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="ml-4 mt-4">
          <ThemeToggle />
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                  <FolderKanban className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                  <span className="group-hover:text-orange-500 transition-colors">
                    Back to DashBoard
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Displaying List of All Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.map((eachProject) => (
            <Card
              key={eachProject._id}
              className="relative w-full max-w-sm pt-0"
            >
              <div className="absolute inset-0 z-30 aspect-video bg-black/30" />

              <img
                src="https://avatar.vercel.sh/shadcn1"
                className="relative z-20 aspect-video w-full object-cover brightness-75 dark:brightness-50"
              />

              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">Featured</Badge>
                </CardAction>
                <CardTitle className="text-xl">{eachProject.name}</CardTitle>
                <CardDescription className="text-md">
                  {eachProject.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Link
                  to={`/project-manage/${eachProject._id}`}
                  className="w-full"
                >
                  <Button className="w-full cursor-pointer">View More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Setting;
