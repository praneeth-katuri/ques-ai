import { X } from "lucide-react";
import styles from "@/styles/podcast/PodcastModal.module.css";
import { useAddPodcastModal } from "@/hooks/useAddPodcastModal";

const AddPodcastModal = ({
  isOpen,
  onClose,
  source,
  image,
  handleSubmit,
  loading,
}) => {
  const { name, setName, transcript, setTranscript, onUpload } =
    useAddPodcastModal({ isOpen, handleSubmit });

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className={styles.header}>
          {image && (
            <img
              src={image}
              alt={`${source} icon`}
              className={styles.icon}
              loading="lazy"
            />
          )}
          <h2>Upload Podcast</h2>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="podcastName">Name</label>
          <input
            id="podcastName"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter podcast name"
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="podcastTranscript">Transcript</label>
          <textarea
            id="podcastTranscript"
            className={styles.textarea}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Enter transcript here..."
            disabled={loading}
          />
        </div>

        <button
          className={styles.uploadBtn}
          onClick={onUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default AddPodcastModal;
