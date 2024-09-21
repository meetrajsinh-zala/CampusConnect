import React, {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from './ui/button';
import {Link} from 'react-router-dom';
import {MessageCirclePlus, Send} from 'lucide-react';
import {Input} from './ui/input';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Filter} from 'bad-words';

const BACKEND_URL = 'http://localhost:8000';
const token = localStorage.getItem ('accessToken');

const HomePostCard = ({notice}) => {
  const [isExpanded, setIsExpanded] = useState (false);
  const [imageUrl, setImageUrl] = useState ('');
  const [likeCount, setLikeCount] = useState (notice.like_count);
  const [showInput, setShowInput] = useState (false);
  const [comment, setComment] = useState ('');
  const filter = new Filter ();

  const handleToggle = () => {
    setIsExpanded (!isExpanded);
  };

  const handleLikeToggle = async () => {
    try {
      const response = await fetch (
        `${BACKEND_URL}/api/notices/${notice.id}/like/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error ('Failed to update like count');
      }

      const data = await response.json ();
      setLikeCount (data.like_count);
    } catch (error) {
      console.error (error.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim ()) {
      alert ('Please enter a valid suggestion.');
      return;
    }

    if (filter.isProfane (comment)) {
      toast.error ('Your suggestion contains inappropriate language.', {
        position: 'bottom-right',
      });
      return;
    }

    try {
      const response = await fetch (
        `${BACKEND_URL}/api/notices/${notice.id}/suggestions/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify ({suggestion: comment}),
        }
      );

      if (!response.ok) {
        throw new Error ('Failed to submit suggestion');
      }

      if (response.ok) {
        const data = await response.json ();
        setComment ('');
        toast.success ('Suggestion Send Successfully...', {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error ('Error submitting suggestion:', error);
      toast.error ('Error In Sending Suggestion...', {
        position: 'bottom-right',
      });
    }
  };

  const handleDownload = () => {
    window.location.href = `http://localhost:8000/api/notices/${notice.id}/download/`;
  };

  useEffect (
    () => {
      if (notice.image) {
        setImageUrl (`${BACKEND_URL}${notice.image}`);
      }
    },
    [notice]
  );
  return (
    <div className="w-full sm:w-[75%] lg:w-[50%] mx-auto my-2">
      <ToastContainer />
      <Card className="w-auto shadow-md ">
        <CardHeader className="flex flex-row gap-2">
          <div className="flex items-center gap-3">
            <div>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <CardTitle className="cursor-pointer text-lg font-medium">
                {notice.username}
              </CardTitle>
              <CardDescription>
                Notice Department : {notice.department}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-4">
          {imageUrl &&
            <img src={imageUrl} className="rounded-lg" alt="Post Image" />}
          <p className="text-sm text-gray-400">
            Created On :{' '}
            {new Date (notice.created_at).toISOString ().split ('T')[0]}
          </p>
          {notice.file &&
            <Link
              className="text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDownload}
            >
              View Attached File
            </Link>}
          {notice.description.length > 100
            ? <p className="text-lg">
                {isExpanded
                  ? notice.description
                  : `${notice.description.slice (0, 100)}...`}
              </p>
            : <p className="text-lg">{notice.description}</p>}
          {notice.description.length > 100 &&
            <button
              onClick={handleToggle}
              className="text-black hover:underline"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>}
        </CardContent>
        <CardFooter className="flex gap-3 flex-col">
          <div className="flex justify-between w-full">
            <Button onClick={handleLikeToggle}>{likeCount} Likes</Button>
            {localStorage.getItem ('role') === 'student' &&
              <Button
                className="bg-transparent text-black hover:bg-transparent shadow border"
                onClick={() => setShowInput (!showInput)}
              >
                <MessageCirclePlus />
              </Button>}
          </div>
          {showInput &&
            <div className="flex justify-between w-full gap-2">
              <Input
                type="text"
                placeholder="Enter Your Suggestions"
                value={comment}
                onChange={e => setComment (e.target.value)}
              />
              <Button
                className="bg-transparent hover:bg-transparent text-black"
                onClick={handleCommentSubmit}
              >
                <Send />
              </Button>
            </div>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomePostCard;
