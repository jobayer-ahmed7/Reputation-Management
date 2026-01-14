import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddService from "@/components/admin/AddService";

const AdminServices = () => {
  return (
    <div className="py-8 space-y-6 p-4">
      {/* Page header */}
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between ">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Services Management
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            View, filter, and manage all services available to customers in the
            storefront.
          </p>
        </div>

        {/* Add service */}
        <div className="flex gap-2">
          <AddService />
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Total services</CardDescription>
            <CardTitle className="text-2xl font-semibold">12</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            All services currently configured in the system.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-2xl font-semibold text-emerald-600">
              6
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            Visible and available for customers to purchase.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription>Inactive</CardDescription>
            <CardTitle className="text-2xl font-semibold text-rose-600">
              4
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-slate-500">
            Hidden from the storefront but kept for later use.
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminServices;
