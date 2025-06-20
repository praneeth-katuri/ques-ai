import styles from "@/styles/podcast/AddPodcastOptions.module.css";
import { Upload } from "lucide-react";
import AddPodcastModal from "./AddPodcastModal";
import RSS from "@/assets/icons/rss.avif";
import Yt from "@/assets/icons/yt.avif";
import { useAddPodcast } from "@/hooks/useAddPodcast";

const AddPodcastOptions = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    source,
    image,
    loading,
    handleSubmit,
  } = useAddPodcast();

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Add Podcast</h2>
      <div className={styles.grid}>
        <div className={styles.card} onClick={() => openModal("rss", RSS)}>
          <div className={styles.text}>
            <h3>RSS Feed</h3>
            <p>Add podcasts via your existing RSS feed.</p>
          </div>
          <img src={RSS} alt="RSS Icon" className={styles.image} />
        </div>

        <div className={styles.card} onClick={() => openModal("youtube", Yt)}>
          <div className={styles.text}>
            <h3>YouTube Video</h3>
            <p>Import podcast episodes from YouTube.</p>
          </div>
          <img src={Yt} alt="YouTube Icon" className={styles.image} />
        </div>

        <div className={styles.card} onClick={() => openModal("upload", null)}>
          <div className={styles.text}>
            <h3>Upload Files</h3>
            <p>Upload your own audio or video podcast files.</p>
          </div>
          <div className={styles.uploadIcon}>
            <Upload size={32} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <AddPodcastModal
        isOpen={isOpen}
        onClose={closeModal}
        source={source}
        image={image}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </section>
  );
};

export default AddPodcastOptions;
