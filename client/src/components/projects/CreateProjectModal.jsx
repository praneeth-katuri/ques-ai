import styles from "@/styles/project/CreateProjectModal.module.css";
import ErrorElement from "@/components/ui/ErrorElement";
import { useCreateProjectModal } from "@/hooks/useCreateProjectModal";

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const { name, error, handleChange, handleSubmit, handleCancel } =
    useCreateProjectModal({ isOpen, onClose, onCreate });

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Create Project</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="projectName" className={styles.label}>
            Enter Project Name:
          </label>
          <input
            id="projectName"
            type="text"
            placeholder="Type here"
            value={name}
            onChange={handleChange}
            className={styles.input}
          />
          {error && <ErrorElement>{error}</ErrorElement>}

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancel}`}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.create}`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
