import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/section-title';
import { useRouter } from 'next/router';

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setIsSubmitting(true);
      const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-definition.php', {
        method: 'POST',
        body: JSON.stringify({
          "cluster_deadline": data.cluster_deadline,
          "cluster_goal": data.cluster_goal,
          "cluster_name": data.cluster_name,
          "cluster_status": data.cluster_status
        }),
      });
      router.push("/cluster-management/definitions/list")

      if (response.ok) {
        console.log('Form data submitted successfully');
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SectionTitle subtitle="Create cluster definition" />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cluster_name" className="block mb-1">Cluster Definition:</label>
            <input
              type="text"
              id="cluster_name"
              name="cluster_name"
              className="border border-gray-300 p-2 w-full"
              ref={register()}
            />
          </div>
          <div>
            <label htmlFor="cluster_goal" className="block mb-1">Cluster Goal:</label>
            <input
              type="number"
              id="cluster_goal"
              name="cluster_goal"
              className="border border-gray-300 p-2 w-full"
              ref={register()}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="cluster_deadline" className="block mb-1">Cluster Deadline:</label>
            <input
              type="date"
              id="cluster_deadline"
              name="cluster_deadline"
              className="border border-gray-300 p-2 w-full"
              ref={register()}
            />
          </div>
          <div>
            <label htmlFor="cluster_status" className="block mb-1">Cluster Status:</label>
            <select
              id="cluster_status"
              name="cluster_status"
              className="border border-gray-300 p-2 w-full"
              ref={register()}
            >
              <option value="">Select a status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

export default MyForm;
