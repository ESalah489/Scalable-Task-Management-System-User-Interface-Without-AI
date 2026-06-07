import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../services/api/axiosInstance"; 
import API_ENDPOINTS from "../../services/api/apiEndpoints"; 
import toast from "react-hot-toast";

export const useTasks = (filters = { page: 1, limit: 10, status: "", search: "" }) => {
  const queryClient = useQueryClient();
  const { page, limit, status, search } = filters;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["tasks", page, limit, status, search],
    queryFn: async () => {
      const res = await axiosInstance.get(API_ENDPOINTS.TASKS.GET_ALL, {
        params: { page, limit, status, search },
      });
      return res.data; 
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const createTask = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post(API_ENDPOINTS.TASKS.POST_TASK, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries(["tasks"]); 
    },
    onError: (err) => {
      const errMsg = err.response?.data?.errors?.[0] || "Failed to create task";
      toast.error(errMsg);
    }
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await axiosInstance.put(API_ENDPOINTS.TASKS.PUT_BY_ID(id), payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (err) => {
      const errMsg = err.response?.data?.errors?.[0] || "Failed to update task";
      toast.error(errMsg);
    }
  });

  const deleteTask = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(API_ENDPOINTS.TASKS.DELETE_BY_ID(id));
      return res.data;
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries(["tasks"]); 
    },
    onError: () => {
      toast.error("Failed to delete task");
    }
  });

  return {
    tasksData: data?.tasks || [],
    pagination: data?.pagination || { totalItems: 0, currentPage: 1, totalPages: 1, limit: 10 },
    isLoading,
    error,
    refetchTasks: refetch,

    isCreating: createTask.isLoading,
    isUpdating: updateTask.isLoading,
    isDeleting: deleteTask.isLoading,

    handleCreateTask: createTask.mutateAsync,
    handleUpdateTask: updateTask.mutateAsync, 
    handleDeleteTask: deleteTask.mutateAsync,
  };
};