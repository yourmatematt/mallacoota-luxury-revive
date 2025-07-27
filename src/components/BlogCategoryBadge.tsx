import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/hooks/useBlogFilters";

interface BlogCategoryBadgeProps {
  categoryId?: string;
}

const BlogCategoryBadge = ({ categoryId }: BlogCategoryBadgeProps) => {
  const { data: categories } = useCategories();
  
  if (!categoryId || !categories) {
    return <Badge variant="secondary">Article</Badge>;
  }
  
  const category = categories.find(cat => cat.id === categoryId);
  
  return (
    <Badge variant="secondary">
      {category?.name || 'Article'}
    </Badge>
  );
};

export default BlogCategoryBadge;