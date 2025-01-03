import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image

interface Comment {
  id: number;
  text: string;
  author: string;
  avatar: string;
  createdAt: string;
}

interface CommentSectionProps {
  blogId: string | string[] | undefined;
  currentUser?: { name: string; avatar: string } | null; // Make currentUser optional
}

const CommentSection = ({ blogId, currentUser }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments') || '{}');
    setComments(storedComments[blogId as string] || []);
  }, [blogId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const storedComments = JSON.parse(localStorage.getItem('comments') || '{}');
    const blogComments = storedComments[blogId as string] || [];

    const updatedComments: Comment[] = [
      ...blogComments,
      {
        id: Date.now(),
        text: newComment,
        author: currentUser?.name || 'User',
        avatar: currentUser?.avatar || '',
        createdAt: new Date().toISOString(),
      },
    ];

    storedComments[blogId as string] = updatedComments;
    localStorage.setItem('comments', JSON.stringify(storedComments));
    setComments(updatedComments);
    setNewComment('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-100 p-4 rounded-lg shadow flex items-start"
          >
            {comment.avatar && (
              <Image
                src={comment.avatar}
                alt={comment.author}
                className="rounded-full mr-3"
                width={40} // Specify width for avatar
                height={40} // Specify height for avatar
              />
            )}
            <div>
              <p className="font-medium">{comment.author}</p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a comment..."
      />
      <button
        onClick={handleAddComment}
        className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentSection;
