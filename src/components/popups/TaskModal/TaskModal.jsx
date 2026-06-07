import { useState, useEffect } from 'react'
import ActionButton from '../../common/Buttons/ActionButton'

const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  taskId = null,
  initialTitle = '',
  initialDescription = '',
  initialStatus = 'Pending',
  title = 'Create New Task',
  saveButtonText = 'Save Task',
  cancelButtonText = 'Cancel'
}) => {
  const [titleValue, setTitleValue] = useState(initialTitle)
  const [descriptionValue, setDescriptionValue] = useState(initialDescription)
  const [statusValue, setStatusValue] = useState(initialStatus)

  useEffect(() => {
    if (isOpen) {
      setTitleValue(initialTitle)
      setDescriptionValue(initialDescription)
      setStatusValue(initialStatus)
    }
  }, [isOpen, initialTitle, initialDescription, initialStatus])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!titleValue.trim()) return

    const payload = {
      title: titleValue.trim(),
      description: descriptionValue.trim(),
    }

    if (taskId) {
      payload.id = taskId
      payload.status = statusValue
    }

    onSave(payload)
    onClose()
  }

  if (!isOpen) return null

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-main-background/70 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          className="relative transform overflow-hidden bg-main-text text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-main-textd px-4 pt-2">
              <div className="sm:flex sm:items-start">
                <div className="text-left w-full">
                  <h3 className="pt-1 text-base font-semibold text-main-background">{title}</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="modal-title" className="block text-sm font-medium text-main-background/80">
                        Title
                      </label>
                      <input
                        type="text"
                        id="modal-title"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                        className="mt-1 w-full outline-none bg-white/60 border border-main-background/20 px-3 py-2 text-main-background focus:outline-none focus:ring-0 focus:ring-main-background"
                        placeholder="Enter task title"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-description" className="block text-sm font-medium text-main-background/80">
                        Description
                      </label>
                      <textarea
                        id="modal-description"
                        rows="3"
                        value={descriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                        className="mt-1 w-full bg-white/60 border border-main-background/20 px-3 py-2 text-main-background focus:outline-none focus:ring-0 focus:ring-main-background"
                        placeholder="Enter task description"
                      />
                    </div>
                    {taskId && (
                      <div>
                        <label htmlFor="modal-status" className="block text-sm font-medium text-main-background/80">
                          Status
                        </label>
                        <select
                          id="modal-status"
                          value={statusValue}
                          onChange={(e) => setStatusValue(e.target.value)}
                          className="mt-1 w-full bg-white/60 border border-main-background/20 px-3 py-2 text-main-background focus:outline-none focus:ring-0 focus:ring-main-background cursor-pointer"
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-main-text px-4 py-5 sm:flex sm:flex-row-reverse flex gap-3">
              <div className="border w-full">
                <ActionButton
                  type="submit"
                  Name={saveButtonText}
                  className="bg-main-background text-main-text inline-flex w-full justify-center"
                />
              </div>
              <div className="border w-full">
                <ActionButton
                  type="button"
                  Name={cancelButtonText}
                  onClick={onClose}
                  className="text-main-background bg-main-text inline-flex w-full justify-center"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskModal