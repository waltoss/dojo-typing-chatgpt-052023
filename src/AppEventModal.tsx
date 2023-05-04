import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { client, CreatePatientEvent } from './client';

function AppEventModal() {
  const { register, handleSubmit } = useForm<CreatePatientEvent>();
  const { mutateAsync } = useMutation(['event'], client.postPatientEvent, {
    onError: () => toast(`Error occured`, { type: 'error' }),
    onSuccess: () => toast(`Event added`, { type: 'success' }),
  });

  function onSubmit(e: CreatePatientEvent) {
    mutateAsync(e);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Event name" />
        <input {...register('date')} aria-label="Event date" type="date" />
        <button type="submit">Add event</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AppEventModal;
