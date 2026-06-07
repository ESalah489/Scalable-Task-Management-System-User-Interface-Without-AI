import React, { useState } from 'react'
import StaticButton from '../../components/common/Buttons/StaticButton'
import TaskModal from '../../components/popups/TaskModal/TaskModal'
import SearchBar from '../../components/common/SearchBar/SearchBar'
import StatusFilters from '../../components/common/Filters/StatusFilters'
import { TasksTable } from '../../components/Tables/TasksTable/TasksTable'
import { useTasks } from '../../hooks/TasksCRUD/useTasks'
import { Toaster } from 'react-hot-toast' 

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("") 
    const itemsPerPage = 4
    const {
        tasksData,
        pagination,
        isLoading,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask
    } = useTasks({
        page: currentPage,
        limit: itemsPerPage,
        status: statusFilter,
        search: searchQuery
    })

const handleSaveTask = async (taskData) => {
        try {
            await handleCreateTask({
                title: taskData.title,
                description: taskData.description
            }) 
            setIsModalOpen(false) 
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }

    const handleStatusChange = (status) => {
        setStatusFilter(status)
        setCurrentPage(1)
    }

    const handleSearchChange = (query) => {
        setSearchQuery(query)
        setCurrentPage(1)
    }

    return (
        <div className='w-full h-auto sm:h-[100dvh] px-8 py-4 flex flex-col gap-10'>
            <Toaster position="top-right" /> 
            <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 '>
                <div className='w-full sm:w-fit'>
                    <h1 className='w-fit text-main-background text-[18px] lg:text-[20px] font-[400] text-left font-[FunnelSansBold]'>
                        Tasks Management Systems
                    </h1>
                </div>
                <div className='w-full sm:w-fit'>
                    <StaticButton
                        Name={"Add New Task"}
                        onClick={() => setIsModalOpen(true)}
                        className="bg-main-background text-main-text w-full sm:w-50"
                    />
                </div>
            </div>
            <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 '>
                <div className='w-full sm:w-fit'>
                    <SearchBar value={searchQuery} onChange={handleSearchChange} />
                </div>
                <div className='w-full sm:w-fit'>
                    <StatusFilters value={statusFilter} onChange={handleStatusChange} />
                </div>
            </div>
            <div className='w-full flex items-center justify-between'>
                <TasksTable 
                    tasksData={tasksData}
                    pagination={pagination}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    handleUpdateTask={handleUpdateTask}
                    handleDeleteTask={handleDeleteTask}
                />
            </div>
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                taskId={null} 
                initialTitle=""
                initialDescription=""
                initialStatus="pending"
                title="Add New Task"
                saveButtonText="Create Task"
            />
        </div>
    )
}

export default Home