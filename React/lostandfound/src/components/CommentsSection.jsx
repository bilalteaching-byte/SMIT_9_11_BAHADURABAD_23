import {
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { getCommentsRef } from "../utils/firebase";
import Loader from "./Loader";

function CommentsSection({ itemId, user }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const hasLoaded = useRef(false);

  useEffect(() => {
    hasLoaded.current = false;
    setLoading(true);

    const commentsQuery = query(
      getCommentsRef(itemId),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      commentsQuery,
      (snapshot) => {
        const data = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setComments(data);
        hasLoaded.current = true;
        setLoading(false);
      },
      (error) => {
        console.error("Failed to load comments:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [itemId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const trimmed = text.trim();
    if (!trimmed || !user || submitting) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticComment = {
      id: tempId,
      text: trimmed,
      userEmail: user.email,
      userUid: user.uid,
      createdAt: Timestamp.now(),
      pending: true,
    };

    setText("");
    setSubmitting(true);
    setComments((prev) => [optimisticComment, ...prev]);

    try {
      await addDoc(getCommentsRef(itemId), {
        text: trimmed,
        userEmail: user.email,
        userUid: user.uid,
        createdAt: serverTimestamp(),
      });
      // Real-time listener replaces the optimistic comment with the saved one
    } catch (error) {
      console.error("Failed to add comment:", error);
      setComments((prev) => prev.filter((comment) => comment.id !== tempId));
      setText(trimmed);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Comments {hasLoaded.current || !loading ? `(${comments.length})` : ""}
      </h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="I found this item near the cafeteria..."
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-xl transition inline-flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader size="sm" inline />
                Posting...
              </>
            ) : (
              "Post Comment"
            )}
          </button>
        </form>
      ) : (
        <div className="mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-gray-500 mb-3">Sign in to leave a comment</p>
          <Link
            to="/auth"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition"
          >
            Sign In
          </Link>
        </div>
      )}

      {loading && !hasLoaded.current ? (
        <Loader label="Loading comments..." size="sm" />
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`border border-gray-100 bg-gray-50 rounded-xl p-4 ${
                comment.pending ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">
                  {comment.userEmail}
                </span>
                <span className="text-xs text-gray-400">
                  {comment.pending ? "Sending..." : formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
