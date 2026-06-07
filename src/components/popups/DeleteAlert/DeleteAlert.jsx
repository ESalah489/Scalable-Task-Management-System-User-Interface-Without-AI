import React from 'react'
import ActionButton from '../../common/Buttons/ActionButton'

const DeleteAlert = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-main-background/70 transition-opacity"
                onClick={onClose}
            />
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div
                    className="relative transform overflow-hidden bg-main-text text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md rounded-xl border border-gray-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-main-background">Delete Task</h3>
                        <p className="mt-2 text-sm text-grat-text">
                            Are you sure you want to delete this task?
                        </p>
                    </div>



                    <div className="bg-main-text px-4 py-5 sm:flex sm:flex-row-reverse flex gap-3">
                        <div className="border border-red-color w-full">
                            <ActionButton
                                type="submit"
                                Name="Delete"
                                onClick={onConfirm}
                                className="text-main-background bg-red-color inline-flex w-full justify-center"
                            />
                        </div>
                        <div className="border w-full">
                            <ActionButton
                                type="button"
                                Name="Cancel"
                                onClick={onClose} className="text-main-background bg-main-text inline-flex w-full justify-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAlert