import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Videos, ChannelCard} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  //use state for channel detail
  const[channelDetail, setChannelDetail] = useState(null);
  //use state for videos
  const [videos, setVideos] = useState([]);

  const { id } = useParams();
  // useEffect will re-render whenever the id changes
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => setChannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setVideos(data?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          // background from https://cssgradient.io/
          background:'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
          <ChannelCard channelDetail ={channelDetail}
          marginTop = '-110px'/>
      </Box>
      <Box display="flex" p="2">
        <Box sx= {{mr: {sm: '100px'}}} />
        <Videos videos= {videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail