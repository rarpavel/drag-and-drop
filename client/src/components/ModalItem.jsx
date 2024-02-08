import { useState } from "react";
import Modal from "./Modal";

export default function ModalItem({ handleClose, show, handleAction }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const submit = () => {
    setError(null);
    if (!value) {
      setError("Task title is required");
      return;
    }
    handleAction({ value });
    setValue("");
  };

  return (
    <Modal
      title="Add Item"
      handleClose={handleClose}
      show={show}
      handleAction={submit}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
          >
            Task title
          </label>
          <input
            value={value}
            onChange={(e) => setValue(e?.target?.value)}
            type="text"
            id="first_name"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Task title"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
