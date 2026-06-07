import { useState, useMemo } from "react";
import { Edit01, Trash01 } from "@untitledui/icons";
import { Table as AriaTable, TableHeader, Column, TableBody, Row, Cell, Button } from "react-aria-components";
import TaskModal from "../../popups/TaskModal/TaskModal";
import DeleteAlert from "../../popups/DeleteAlert/DeleteAlert";
import ActionsLoader from "../../common/ActionsLoader/ActionsLoader";

export const TasksTable = ({
    tasksData,
    pagination,
    isLoading,
    currentPage,
    setCurrentPage,
    handleUpdateTask,
    handleDeleteTask,
    handleCreateTask
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "title",
        direction: "ascending",
    });
    const sortedItems = useMemo(() => {
        if (!tasksData) return [];
        return [...tasksData].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                return sortDescriptor.direction === "descending" ? cmp * -1 : cmp;
            }
            return 0;
        });
    }, [sortDescriptor, tasksData]);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return { text: "Completed", bg: "bg-green-50 text-green-700 border-green-200" };
            case "in-progress":
                return { text: "In Progress", bg: "bg-blue-50 text-blue-700 border-blue-200" };
            case "pending":
            default:
                return { text: "Pending", bg: "bg-amber-50 text-amber-700 border-amber-200" };
        }
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = async (formData) => {
        try {
            if (editingTask) {
                const { title, description, status } = formData;
                await handleUpdateTask({
                    id: editingTask.id,
                    payload: { title, description, status }
                });
            } else {
                await handleCreateTask(formData);
            }
            setIsModalOpen(false);
            setEditingTask(null);
        } catch (error) {
            console.error("Operation failed:", error);
        }
    };

    const handleDeleteClick = (id) => {
        setTaskToDelete(id);
        setIsDeletePopupOpen(true);
    }

    const handleConfirmDelete = async () => {
        if (taskToDelete) {
            await handleDeleteTask(taskToDelete);
            if (tasksData.length === 1 && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
            }
            setIsDeletePopupOpen(false);
            setTaskToDelete(null);
        }
    };

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto relative min-h-[200px]">
                {isLoading && (
                    <div className=" absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  flex items-center justify-center">
                        <ActionsLoader />
                    </div>
                )}
                <AriaTable
                    aria-label="Tasks Management"
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    onSortChange={(descriptor) => setSortDescriptor(descriptor)}
                    className="w-full text-left border-collapse"
                >
                    <TableHeader className="border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-text uppercase tracking-wider">
                        <Column isRowHeader id="title" allowsSorting className="p-4 cursor-pointer hover:bg-gray-100">Title</Column>
                        <Column id="description" className="p-4">Description</Column>
                        <Column id="createdAt" allowsSorting className="p-4 cursor-pointer hover:bg-gray-100">
                            Created At
                        </Column>
                        <Column id="status" allowsSorting className="p-4 cursor-pointer hover:bg-gray-100">Status</Column>
                        <Column id="actions" className="p-4 text-right"></Column>
                    </TableHeader>
                    <TableBody
                        items={sortedItems}
                        renderEmptyState={() => (
                            <div className="p-18 text-center text-sm text-gray-text font-medium">
                                No data available now.
                            </div>
                        )}
                    >
                        {(item) => (
                            <Row id={item.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                                <Cell className="p-4 text-sm text-gray-700 whitespace-nowrap font-medium">{item.title}</Cell>
                                <Cell className="p-4 text-sm text-gray-text max-w-xs md:max-w-md truncate">{item.description || "—"}</Cell>

                                <Cell className="p-4 text-sm text-gray-700 whitespace-nowrap">
                                    {new Date(item.createdAt).toLocaleString("en-US", {
                                        weekday: "short",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Cell>

                                <Cell className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(item.status).bg}`}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                        {getStatusStyles(item.status).text}
                                    </span>
                                </Cell>
                                <Cell className="p-4 text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button onClick={() => handleEditClick(item)} className="p-1.5 text-gray-text hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                            <Edit01 className="w-4 h-4" />
                                        </Button>
                                        <Button onClick={() => handleDeleteClick(item.id)} className="p-1.5 text-gray-text hover:text-red-color rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                                            <Trash01 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Cell>
                            </Row>
                        )}
                    </TableBody>
                </AriaTable>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 p-4 md:px-6 bg-white">
                <span className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{pagination?.currentPage || 1}</span> of <span className="font-medium">{pagination?.totalPages || 1}</span>
                </span>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        isDisabled={currentPage === 1 || isLoading}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white font-medium shadow-xs transition-colors cursor-pointer"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination?.totalPages || 1))}
                        isDisabled={currentPage === pagination?.totalPages || pagination?.totalPages === 0 || isLoading}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white font-medium shadow-xs transition-colors cursor-pointer"
                    >
                        Next
                    </Button>
                </div>
            </div>

            <DeleteAlert
                isOpen={isDeletePopupOpen}
                onClose={() => {
                    setIsDeletePopupOpen(false)
                    setTaskToDelete(null)
                }}
                onConfirm={handleConfirmDelete}
            />
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                }}
                onSave={handleSaveTask}
                taskId={editingTask?.id}
                initialTitle={editingTask?.title || ""}
                initialDescription={editingTask?.description || ""}
                initialStatus={editingTask?.status || "pending"}
                title={editingTask ? "Edit Task" : "Create New Task"}
                saveButtonText={editingTask ? "Update Task" : "Save Task"}
            />
        </div>
    );
};