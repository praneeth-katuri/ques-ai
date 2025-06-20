import { ArrowLeft } from "lucide-react";
import styles from "@/styles/podcast/EditPodcasts.module.css";
import { useEditPodcast } from "@/hooks/useEditPodcast";

const EditPodcasts = () => {
  const {
    podcast,
    text,
    isEditing,
    handleEdit,
    handleCancel,
    handleSave,
    setText,
    goBack,
  } = useEditPodcast();

  if (!podcast) {
    return <div className={styles.container}>Podcast not found.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <ArrowLeft className={styles.backIcon} onClick={goBack} />
          <h1 className={styles.title}>Edit Description</h1>
        </div>
        {!isEditing ? (
          <button className={styles.editButton} onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <div className={styles.editActions}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <h3 className={styles.speaker}>Podcast Description</h3>
        {!isEditing ? (
          <p className={styles.text}>{text}</p>
        ) : (
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default EditPodcasts;
