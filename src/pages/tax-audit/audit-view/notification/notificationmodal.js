import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import NewNotificationButton from './button';

const NotificationModal = ({ isOpen, closeModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            //   className="Modal fixed inset-0 flex items-center justify-center"
            //   overlayClassName="Overlay fixed inset-0 bg-black bg-opacity-80"

            className="bg-white rounded p-4 max-w-sm border mx-auto "
            overlayClassName="fixed inset-2 opacity-100"

        >
            <div className="overflow-y-auto">
            
                <form onSubmit={handleSubmit}>
                    {/* Add input fields for the remaining properties */}
                    <div className="mb-2">
                        <label htmlFor="notification_date" className="font-semibold block mb-1">
                            Notification Date:
                        </label>
                        <input
                            type="date"
                            id="notification_date"
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="notification_delivery" className="font-semibold block mb-1">
                            Delivery Method:
                        </label>
                        <select
                            id="notification_delivery"
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            required
                        >
                            <option value="">Select Delivery Method</option>
                            <option value="Mail">Mail</option>
                            <option value="Email">Email</option>
                            <option value="SMS">SMS</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="notification_file" className="font-semibold block mb-1">
                            Notification File:
                        </label>
                        <input
                            type="file"
                            id="notification_file"
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            // onChange={handleFileChange}
                            required
                            {...register('notification_file', { required: true })}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="notification_status" className="font-semibold block mb-1">
                            Notification Status:
                        </label>
                            <select
                            id="notification_status"
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            required
                        >
                            <option value="">Select Delivery Method</option>
                            <option value="Mail">Mail</option>
                            <option value="Email">Email</option>
                            <option value="SMS">SMS</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="notification_date" className="font-semibold block mb-1">
                            Notification Note:
                        </label>
                        <textarea

                            id="notification_note"
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="notification_body" className="font-semibold block mb-1">
                            Notification Body:
                        </label>
                        <textarea

                            id="notification_body"
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            required
                        ></textarea>
                    </div>
                    {/* Add input fields for the remaining properties */}
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mt-4 ml-2"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default NotificationModal;
