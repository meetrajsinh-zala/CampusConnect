import React, {useState, useEffect} from 'react';
import {Card, CardContent} from './ui/card';
import PostCard from './PostCard';
import {useParams} from 'react-router-dom';
import { Search } from 'lucide-react';

const DisplaySuggestion = () => {
  const [suggestions, setSuggestions] = useState ([]);
  const [post, setPost] = useState([]);
  const {noticeId} = useParams ();
  const fetchSuggestions = async () => {
    try {
      const response = await fetch (
        `http://localhost:8000/api/notices/${noticeId}/suggestions/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem ('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error ('Failed to fetch suggestions');
      }

      const data = await response.json ();
      setSuggestions (data);
      console.log(data)
    } catch (error) {
      console.log (error.message);
    }
  };

  const fetchNotice = async () => {
    try{
      const response = await fetch(
        `http://localhost:8000/api/notices/${noticeId}/`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem ('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) {
        throw new Error ('Failed to fetch notice');
      }
      const data = await response.json ();
      setPost(data)
    }
    catch (error) {
      console.log (error.message);
    }
  } 

  useEffect(() => {
    if (noticeId) {
      fetchSuggestions();
      fetchNotice();
    }
  }, [noticeId]);

  return (
    <React.Fragment>
      <h2 className="p-6 font-bold text-2xl">Notice Suggestion</h2>
      <div className="w-full flex flex-col md:flex-row gap-6 p-6">
        <div className="w-full md:w-[30%]">
          <PostCard key={post.id} data={post}/>
        </div>
        <div className="w-full md:w-[70%] flex flex-wrap gap-4 border rounded-md shadow">
          {suggestions?.length > 0 ? suggestions?.map(suggestion => {
            return <Card className="w-full md:w-[350px]">
            <CardContent className="pt-4">
              <p>
                <span className="font-medium">Name</span> : {`${suggestion.first_name} ${suggestion.last_name}`}
              </p>
              <p>
                <span className="font-medium">Username</span> : {suggestion.username}
              </p>
              <p><span className="font-medium">Sem</span> : {suggestion.semester}</p>
              <p><span className="font-medium">Department</span> : {suggestion.department}</p>
              <p>
                <span className="font-medium">Suggestions</span> :
                {suggestion.suggestion}
              </p>
            </CardContent>
          </Card>
          }) : <div className='w-full md:w-[100%] flex flex-wrap gap-4 justify-center items-center'>
            <div className='flex flex-col items-center gap-2'>
            <Search size={30}/>
            <p className='font-semibold text-wrap w-60 text-center'>Looks like you haven't got any suggestions yet</p>
            </div>
            </div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DisplaySuggestion;
