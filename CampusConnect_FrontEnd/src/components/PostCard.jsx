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
import {FcLike} from 'react-icons/fc';
import {Button} from '@/components/ui/button';
import {Link, useNavigate} from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const BACKEND_URL = 'http://localhost:8000';

const PostCard = ({onUpdate, data, onDelete}) => {
  const [isExpanded, setIsExpanded] = useState (false);
  const [imageUrl, setImageUrl] = useState ('');
  const [showLikedUser, setShowLikedUser] = useState(false)
  const navigate = useNavigate ();
  console.log(data)
  const fullText = data?.description;

  const handleToggle = () => {
    setIsExpanded (!isExpanded);
  };

  const handleDownload = () => {
    window.location.href = `http://localhost:8000/api/notices/${data?.id}/download/`;
  };

  useEffect (
    () => {
      if (data?.image) {
        setImageUrl (`${BACKEND_URL}${data?.image}`);
      }
    },
    [data]
  );

  return (
    <React.Fragment>
      <div className="flex flex-col gap-2">
        <Card className="w-auto shadow-md ">  
          <CardHeader className="flex flex-row items-center gap-2">
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
                <CardTitle className="cursor-pointer">
                  {data?.username}
                </CardTitle>
                <CardDescription>
                  Notice Deparment : {data?.department}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col justify-center gap-4">
            {imageUrl &&
              <img
                src={imageUrl}
                className="rounded-lg"
                alt="Post Thumbnail"
              />}
            {data?.file &&
              <Link
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownload}
              >
                View Attached File
              </Link>}
            {data?.description?.length > 100
              ? <p className="text-lg">
                  {isExpanded ? fullText : `${fullText.slice (0, 100)}...`}{' '}
                </p>
              : <p className="text-lg">{fullText}</p>}
            {data?.description?.length > 100 &&
              <button
                onClick={handleToggle}
                className="text-black hover:underline"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <div className="flex items-center w-full justify-between">
              <div className={`flex gap-2`}>
                <button onClick={() => setShowLikedUser(!showLikedUser)}><FcLike size={24} /></button>
                <p className="select-none">{data?.like_count} Likes</p>
              </div>
              {window.location.pathname === '/Profile' && <div className="flex gap-2">
                <Button variant="outline" onClick={onUpdate}>
                  Update
                </Button>
                <Button
                  onClick={() => onDelete (data.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>}
            </div>
            {showLikedUser && <div className='w-full bg-white z-10'>
        <Table className="overflow-scroll">
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Liked User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.liked_users.map((user,idx) => {
                return <TableRow>
                  <TableCell>{idx}</TableCell>
                  <TableCell>{user}</TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </div>}
            {window.location.pathname === '/Profile' && <div className="w-full">
              <Button
                className="w-full bg-[#1570ef] hover:bg-[#1570ef]/80"
                onClick={() => {
                  navigate (`/DisplaySuggestion/${data.id}`);
                }}
              >
                View Suggestions
              </Button>
            </div>}
          </CardFooter>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default PostCard;
