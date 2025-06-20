import styles from "@/styles/podcast/PodcastTable.module.css";
import { usePodcastTable } from "@/hooks/usePodcastTable";
import Spinner from "../ui/Spinner";

const PodcastTable = () => {
  const { podcasts, handleView, loading, handleDelete, formatDateTime } =
    usePodcastTable();

  if (loading) return <Spinner />;

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Your Files</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Upload Date & Time</th>
              <th className={styles.narrow}>Action</th>
            </tr>
          </thead>
          <tbody>
            {podcasts.map((podcast, index) => (
              <tr key={podcast._id}>
                <td>{index + 1}</td>
                <td>{podcast.title}</td>
                <td className={styles.narrow}>
                  {formatDateTime(podcast.createdAt)}
                </td>
                <td className={`${styles.actions} ${styles.narrow}`}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => handleView(podcast._id)}
                  >
                    View
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(podcast._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {podcasts.length === 0 && (
              <tr>
                <td colSpan="4" className={styles.empty}>
                  No podcasts uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PodcastTable;
