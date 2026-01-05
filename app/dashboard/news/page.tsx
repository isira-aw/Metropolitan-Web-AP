"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateRangeFilter } from "@/components/shared/date-range-filter";
import { Pagination } from "@/components/shared/pagination";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { newsApi } from "@/lib/api/news";
import { formatDateTime } from "@/lib/utils";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { News } from "@/types";

export default function NewsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["news", page, fromDate, toDate],
    queryFn: () => newsApi.getAll({
      page,
      limit: 20,
      fromDate: fromDate ? new Date(fromDate).toISOString() : undefined,
      toDate: toDate ? new Date(toDate).toISOString() : undefined,
    }),
  });

  const deleteMutation = useMutation({
    mutationFn: newsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setDeleteId(null);
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">News Articles</h1>
        <Link href="/dashboard/news/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      <Card className="p-6 mb-6">
        <DateRangeFilter
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onClear={() => { setFromDate(""); setToDate(""); setPage(1); }}
        />
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Summary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data?.data.map((item: News) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{item.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.summary?.substring(0, 100)}...</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDateTime(item.date)}</td>
                      <td className="px-6 py-4 text-sm text-right space-x-2">
                        <Link href={`/dashboard/news/${item.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {data && data.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}

      <DeleteDialog
        isOpen={deleteId !== null}
        title="Delete News Article"
        description="Are you sure you want to delete this news article? This action cannot be undone."
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
