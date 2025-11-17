import BlogTags from "../../../components/dashboard/BlogDash/BlogTag";
import PageMeta from "../../../components/dashboard/common/PageMeta";


export default function BlogCategoriesPage() {
  return (
    <div>
      <PageMeta
        title="Blog Tag Dashboard"
        description="Manage all blog tags in the dashboard."
      />
      <BlogTags />
    </div>
  );
}
