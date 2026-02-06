import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to the MVP Template dashboard.
      </p>
      <div className="mt-6">
        <Link
          href="/dashboard/demo"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          View Demos
        </Link>
      </div>
    </div>
  );
}
