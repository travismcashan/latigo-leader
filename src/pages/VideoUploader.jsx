import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Upload, Loader, Copy } from "lucide-react";

export default function VideoUploader() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [queue, setQueue] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (!currentUser || currentUser.role !== "admin") {
          window.location.href = "/";
        }
        setUser(currentUser);
      } catch (e) {
        window.location.href = "/";
      }
    };
    checkAuth();
  }, []);

  const { data: videos = [] } = useQuery({
    queryKey: ["videos"],
    queryFn: () => base44.entities.Video.list(),
    enabled: !!user,
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (videoId) => base44.entities.Video.delete(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });

  const uploadFile = async (videoFile, videoTitle, index) => {
    const fileSizeMB = (videoFile.size / (1024 * 1024)).toFixed(2);
    
    const uploadedFile = await base44.integrations.Core.UploadFile({ file: videoFile });
    
    setUploadProgress(prev => ({
      ...prev,
      [index]: { completed: true, sizeMB: fileSizeMB }
    }));
    
    await base44.entities.Video.create({
      title: videoTitle || videoFile.name.replace(/\.[^/.]+$/, ""),
      file_url: uploadedFile.file_url,
      uploaded_by: user.email,
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    try {
      await uploadFile(file, title);
      setTitle("");
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const processQueue = async () => {
    if (queue.length === 0) return;
    setUploading(true);
    setUploadProgress({});
    
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      setUploadingIndex(i);
      try {
        await uploadFile(item.file, item.title, i);
      } catch (error) {
        alert(`Failed to upload ${item.file.name}: ${error.message}`);
        setUploadProgress(prev => ({
          ...prev,
          [i]: { error: true }
        }));
      }
    }
    
    setQueue([]);
    setUploadingIndex(null);
    queryClient.invalidateQueries({ queryKey: ["videos"] });
    setUploading(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    const videoFiles = Array.from(files).filter(f => f.type.startsWith("video/"));
    
    const newItems = videoFiles.map(f => ({
      file: f,
      title: f.name.replace(/\.[^/.]+$/, ""),
    }));
    
    setQueue(prev => [...prev, ...newItems]);
  };

  if (!user) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;

  return (
    <div style={{ padding: "4rem 4vw", maxWidth: 1400, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
        Video Uploader
      </h1>

      {uploading && (
        <div style={{
          background: "#E3F2FD",
          border: "1px solid #90CAF9",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}>
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ display: "grid", gap: "1rem" }}>
            {queue.map((item, idx) => {
              const fileSizeMB = (item.file.size / (1024 * 1024)).toFixed(2);
              const progress = uploadProgress[idx];
              const isCurrentlyUploading = uploadingIndex === idx;
              
              return (
                <div key={idx} style={{
                  padding: "1rem",
                  background: "#FFFFFF",
                  borderRadius: "4px",
                  border: `1px solid ${progress?.error ? "#EF5350" : progress?.completed ? "#66BB6A" : "#90CAF9"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    {isCurrentlyUploading && (
                      <Loader size={16} style={{ animation: "spin 1s linear infinite", color: "#1565C0", flexShrink: 0 }} />
                    )}
                    {progress?.completed && (
                      <span style={{ fontSize: "1.2rem", color: "#66BB6A", flexShrink: 0 }}>✓</span>
                    )}
                    {progress?.error && (
                      <span style={{ fontSize: "1.2rem", color: "#EF5350", flexShrink: 0 }}>✕</span>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 500, color: "#333", wordBreak: "break-word" }}>
                        {item.title || item.file.name}
                      </p>
                      <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.85rem", color: "#666" }}>
                        {fileSizeMB} MB {isCurrentlyUploading && "• Uploading..."}
                        {progress?.completed && "• Done"}
                        {progress?.error && "• Failed"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? "#2A5C5A" : "#CCC"}`,
          borderRadius: "8px",
          padding: "3rem",
          textAlign: "center",
          marginBottom: "2rem",
          background: dragActive ? "#F5F5F5" : "#FAFAFA",
          transition: "all 0.2s",
          cursor: "pointer",
        }}
      >
        <Upload size={32} style={{ color: "#999", marginBottom: "1rem" }} />
        <p style={{ margin: "0 0 0.5rem 0", fontWeight: 500, color: "#333" }}>
          Drag video files here to upload
        </p>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#999" }}>
          Drop multiple files and they'll be queued for upload
        </p>
      </div>

      {queue.length > 0 && (
        <div style={{
          background: "#FFF",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          border: "1px solid #E0E0E0",
        }}>
          <h3 style={{ margin: "0 0 1rem 0", fontWeight: 600 }}>
            Queue ({queue.length} file{queue.length !== 1 ? "s" : ""})
          </h3>
          <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1rem" }}>
            {queue.map((item, idx) => (
              <div key={idx} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem",
                background: "#F5F5F5",
                borderRadius: "4px",
                fontSize: "0.9rem",
              }}>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => setQueue(prev => {
                    const updated = [...prev];
                    updated[idx].title = e.target.value;
                    return updated;
                  })}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    border: "1px solid #DDD",
                    borderRadius: "4px",
                    fontFamily: "inherit",
                    marginRight: "0.75rem",
                  }}
                />
                <button
                  onClick={() => setQueue(prev => prev.filter((_, i) => i !== idx))}
                  style={{
                    padding: "0.5rem 0.75rem",
                    background: "#FFF",
                    border: "1px solid #E0E0E0",
                    borderRadius: "4px",
                    cursor: "pointer",
                    color: "#D32F2F",
                    fontSize: "0.85rem",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={processQueue}
            disabled={uploading}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: uploading ? "#CCC" : "#2A5C5A",
              color: "#FFF",
              border: "none",
              borderRadius: "4px",
              fontWeight: 600,
              cursor: uploading ? "not-allowed" : "pointer",
            }}
          >
            Upload {queue.length} Video{queue.length !== 1 ? "s" : ""}
          </button>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleUpload} style={{ background: "#FFFFFF", padding: "2rem", borderRadius: "8px", marginBottom: "3rem", maxWidth: 500 }}>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem" }}>
            Video Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #E0E0E0",
              borderRadius: "4px",
              fontFamily: "inherit",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem" }}>
            Video File (.mov, .mp4, etc)
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept="video/*"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #E0E0E0",
              borderRadius: "4px",
            }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading || !file || !title}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: uploading ? "#CCC" : "#2A5C5A",
            color: "#FFF",
            border: "none",
            borderRadius: "4px",
            fontWeight: 600,
            cursor: uploading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Upload size={16} />
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {/* Videos List */}
      <div>
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          Uploaded Videos ({videos.length})
        </h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          {videos.length === 0 ? (
            <p style={{ color: "#999" }}>No videos uploaded yet.</p>
          ) : (
            videos.map((video) => (
              <div
                key={video.id}
                style={{
                  background: "#FFFFFF",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #E0E0E0",
                }}
              >
                <div>
                   <h3 style={{ margin: "0 0 0.5rem 0", fontWeight: 600 }}>{video.title}</h3>
                   <p style={{ margin: 0, fontSize: "0.85rem", color: "#666", wordBreak: "break-all", marginBottom: "0.5rem" }}>
                     {video.file_url}
                   </p>
                   <p style={{ margin: 0, fontSize: "0.85rem", color: "#999" }}>
                     Uploaded by {video.uploaded_by}
                   </p>
                 </div>
                 <div style={{ display: "flex", gap: "0.5rem" }}>
                   <button
                     onClick={() => {
                       navigator.clipboard.writeText(video.file_url);
                       setCopiedId(video.id);
                       setTimeout(() => setCopiedId(null), 2000);
                     }}
                     title="Copy URL"
                     style={{
                       padding: "0.5rem",
                       background: copiedId === video.id ? "#4CAF50" : "#FFF",
                       border: `1px solid ${copiedId === video.id ? "#4CAF50" : "#E0E0E0"}`,
                       borderRadius: "4px",
                       cursor: "pointer",
                       color: copiedId === video.id ? "#FFF" : "#2A5C5A",
                       display: "flex",
                       alignItems: "center",
                       gap: "0.5rem",
                     }}
                   >
                     <Copy size={16} />
                     {copiedId === video.id ? "Copied" : "Copy URL"}
                   </button>
                   <button
                     onClick={() => deleteVideoMutation.mutate(video.id)}
                     style={{
                       padding: "0.5rem",
                       background: "#FFF",
                       border: "1px solid #E0E0E0",
                       borderRadius: "4px",
                       cursor: "pointer",
                       color: "#D32F2F",
                       display: "flex",
                       alignItems: "center",
                       gap: "0.5rem",
                     }}
                   >
                     <Trash2 size={16} />
                     Delete
                   </button>
                 </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}