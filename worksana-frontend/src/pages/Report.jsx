import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  FileText,
  Menu,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Report = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastWeekTasks, setLastWeekTasks] = useState([]);
  const [pendingWork, setPendingWork] = useState({});
  const [closedByTeam, setClosedByTeam] = useState({});
  const [closedByOwner, setClosedByOwner] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);

        // Fetch last week completed tasks
        const lastWeekRes = await fetch(
          "https://workasana-seven.vercel.app/api/report/last-week",
          { credentials: "include" },
        );
        const lastWeekData = await lastWeekRes.json();
        setLastWeekTasks(lastWeekData.tasks || []);

        // Fetch pending work
        const pendingRes = await fetch(
          "https://workasana-seven.vercel.app/api/report/pending",
          { credentials: "include" },
        );
        const pendingData = await pendingRes.json();
        setPendingWork(pendingData);

        // Fetch closed tasks by team
        const teamRes = await fetch(
          "https://workasana-seven.vercel.app/api/report/closed-tasks?groupBy=team",
          { credentials: "include" },
        );
        const teamData = await teamRes.json();
        setClosedByTeam(teamData.report || {});

        // Fetch closed tasks by owner
        const ownerRes = await fetch(
          "https://workasana-seven.vercel.app/api/report/closed-tasks?groupBy=owner",
          { credentials: "include" },
        );
        const ownerData = await ownerRes.json();
        setClosedByOwner(ownerData.report || {});

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const lastWeekChartData = lastWeekTasks.reduce((acc, task) => {
    const date = new Date(task.updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.tasks += 1;
    } else {
      acc.push({ date, tasks: 1 });
    }
    return acc;
  }, []);

  const teamChartData = Object.entries(closedByTeam).map(([team, data]) => ({
    name: team,
    tasks: data.count,
  }));

  const ownerChartData = Object.entries(closedByOwner).map(([owner, data]) => ({
    name: owner,
    tasks: data.count,
  }));

  const COLORS = [
    "#f97316",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
  ];

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
                <Link to="/settings" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto mt-16 md:mt-0">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                WorkSana Reports
              </h1>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Loading reports...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Completed Last Week
                      </CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {lastWeekTasks.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Tasks completed in the last 7 days
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pending Work
                      </CardTitle>
                      <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {pendingWork.totalPendingDays || 0} days
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {pendingWork.totalPendingTasks || 0} pending tasks
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Closed
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Object.values(closedByTeam).reduce(
                          (sum, team) => sum + team.count,
                          0,
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        All completed tasks
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tasks Completed Last Week</CardTitle>
                      <CardDescription>
                        Daily breakdown of completed tasks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {lastWeekChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={lastWeekChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="tasks"
                              stroke="#f97316"
                              strokeWidth={2}
                              name="Tasks Completed"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                          No tasks completed in the last week
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Work Distribution</CardTitle>
                      <CardDescription>
                        Total days of work remaining
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center h-64">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-orange-600">
                            {pendingWork.totalPendingDays || 0}
                          </div>
                          <p className="text-muted-foreground mt-2">
                            Days of work pending
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Across {pendingWork.totalPendingTasks || 0} tasks
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tasks Closed by Team</CardTitle>
                      <CardDescription>
                        Completed tasks grouped by team
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {teamChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={teamChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                              dataKey="tasks"
                              fill="#f97316"
                              name="Completed Tasks"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                          No completed tasks by team
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tasks Closed by Owner</CardTitle>
                      <CardDescription>
                        Completed tasks grouped by owner
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {ownerChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={ownerChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="tasks"
                            >
                              {ownerChartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                          No completed tasks by owner
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Report;
