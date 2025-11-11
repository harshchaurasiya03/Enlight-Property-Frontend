import PageBreadcrumb from "../../../components/dashboard/common/PageBreadCrumb";
import ComponentCard from "../../../components/dashboard/common/ComponentCard";
import PageMeta from "../../../components/dashboard/common/PageMeta";
import BasicTableOne from "../../../components/dashboard/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="user Management - Basic Tables"
        description="user Management Basic Tables page of Enlight Dashboard ."
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        <ComponentCard title="User Management Tables">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
