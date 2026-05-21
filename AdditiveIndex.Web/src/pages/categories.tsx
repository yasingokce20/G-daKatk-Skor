import { useListCategories } from "@/api";
import { FolderKanban, Tags, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function Categories() {
  const { data: categories, isLoading, isError } = useListCategories();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <FolderKanban className="w-8 h-8" />
          Functional Categories
        </h1>
        <p className="text-muted-foreground mt-1">
          Food additives grouped by their primary technological function in food.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-48">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))
        ) : isError ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Failed to load categories.
          </div>
        ) : categories?.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No categories available.
          </div>
        ) : (
          categories?.map((cat) => (
            <Card key={cat.id} className="group hover:border-primary/50 transition-colors bg-card/50 hover:bg-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {cat.name}
                  </CardTitle>
                  <Tags className="w-5 h-5 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </div>
                {cat.eCodeRange && (
                  <Badge variant="outline" className="w-fit font-mono mt-2 bg-background">
                    {cat.eCodeRange}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {cat.description || "No description available for this category."}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  );
}
