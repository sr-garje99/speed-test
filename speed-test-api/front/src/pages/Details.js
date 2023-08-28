import { Box, TextField, Typography, MenuItem, Card, Button, Paper, styled,Divider,Grid } from '@mui/material';
import TitleBar from '../components/TitleBar';
import pic from '../static/launch1.gif'
import correct from '../static/Correct.png'
import download from '../static/download.png'
import upload from '../static/upload.png'
import refresh from '../static/refresh.png'
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Details = () => {

    //var ping ;
    var URL ='https://speedtest-upload-test-btwholesale.akamaized.net/latency_check';
    var DOWNLOAD_URL=`https://speedtest-download-btwholesale.akamaized.net/PT/1000MB.bin`;
    var UPLOAD_URL = `https://www.speedtestderbyb.btwholesale.com:8080/`;
    var downloadedData1 =0;
    var downloadedData2 =0;
    var downloadedData3 =0;
    var downloadedData4 =0;
    //var upSpeed = 0;
    var dataSize = 0;
    var myData;
    var incData =0;
    var tempData = 0;
    var arrUpData1 = [];
    var cnt = 1 ;
    var datasize =61275;
    const [ping,setPing] = useState('--');
    const [dspeed,setDspeed] = useState('--');
    const [flag,setFlag] = useState(false);
    const [upSpeed,setUpSpeed] =useState('--');
    const [once,setOnce] = useState(true);
    const [current,setCurrent] = useState('--')
    let speedArray = [];
    const onclickHandler = async()=>{
        if(navigator.onLine){
        setFlag(true);
        setDspeed('--')
        setPing('--')
        setUpSpeed('--')
        getPing();
       await getDownloadSpeed();
        getUploadSpeed();
        //setTimeout(calculateSpeed(),20000)
        arrUpData1=[];
        }else{
            alert("Please connect to Internet !")
        }
        
    }
    const getPing = async () =>{
        let start_time = new Date().getTime();
        //const result = await axios.get(`http://localhost:8080/api/test/`);
        await axios.all([axios.get(URL), axios.get(URL), axios.get(URL),axios.get(URL)])
        .then(axios.spread(function(resp1,resp2,resp3,resp4){
            let end_time = new Date().getTime();
            setPing((end_time - start_time)/4);
        setCurrent(ping);
        console.log();

        })).catch((err)=>{

        })
     
        
        
        
        //return ping;
        
    }
    const getDownloadSpeed = async()=>{
        var fdspeed=0;
        try{
        await axios.all([getDownloadSpeed1(),getDownloadSpeed2(),getDownloadSpeed3(),getDownloadSpeed4()])
         }catch(err){

         }
         
    
         var data = downloadedData1+downloadedData2+downloadedData3+downloadedData4;
         fdspeed= (
                (data * 8) /
                1000000 /
                (5)
            ).toFixed(2);
         setDspeed(fdspeed)
        // console.log(downloadedData1);
          
    }
    const getUploadSpeed = async ()=>{
       // calculateData(datasize);
        for(var i =0;i<10;i++){
        await  start_upload_new("id" + cnt) 
        }

        console.log(arrUpData1);
        console.log(speedArray);
        for(let i=0;i<10;i++){
            console.log(speedArray[i]);
        }
        let max = Math.max(...speedArray);
        setUpSpeed(max);
        setCurrent(max);
        console.log(max+"hi")
        setFlag(false);
    }
    // setTimeout( calculateSpeed,2000)
    
  const start_upload_new = async (getUpId) => {
    //console.log("start_upload_new");
    calculateDataTemp(100000);

    incData = tempData + new Date().getTime() + incData;


      
      var sTime, eTime;

      sTime = new Date().getTime();
      var config = {
        cache: false,
        timeout: 5000,
      };

      return await axios
        .post(UPLOAD_URL + Math.random(), incData)
        .then((res) => {
        
          eTime = new Date().getTime();
          var bitsLoaded1 = incData.length;
        
          var minusSeconds = eTime - sTime;
          var json = JSON.parse(JSON.stringify(res));
          
          var a = res.data.uploadSpeedPerSecHumanReadable;
          var speedUPMbps_s = a.toFixed(2);
          
          var bitsLoaded1 = parseFloat(bitsLoaded1) * 8;
          var MiliSecTOSec = minusSeconds / 1000;
          var speedUPBps = bitsLoaded1 / MiliSecTOSec;
          var speedUPKbps = speedUPBps / 1000;
          var speedUPMbps = (speedUPKbps / 1000).toFixed(2);
          arrUpData1.push({
            id: getUpId,
            startTime: sTime,
            endTime: eTime,
            duration: minusSeconds,
            dataDownloaded: bitsLoaded1,
            ServerSpeed: speedUPMbps_s,
            Speed : speedUPMbps,
          });
          speedArray.push(speedUPMbps);
          setUpSpeed(speedUPMbps);
          setCurrent(speedUPMbps);
          cnt++;
        //   if(cnt <10){
        //      start_upload_new("id" + cnt);
        // }else{
        //     return;
        // }
          
        })
        .catch((error) => {
          
        });
    
  };

  const calculateDataTemp = (dataSizeInBytes) => {
    tempData = "d="; // the raw data you will send
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (
      var i = 0;
      i < dataSizeInBytes;
      i++ //if you want to send 1 kb (2 + 1022 bytes = 1024b = 1kb). change it the way you want
    ) {
         tempData += possible.charAt(Math.floor(Math.random() * possible.length)); // add one byte of data;
    }
  };
    const getDownloadSpeed1 = async() =>{ 
        var start_time = new Date().getTime();
            try{
            return await axios({
                method:"get",
                url:DOWNLOAD_URL+ "?_=" + new Date().getTime()+ "&_Thread1",
                timeout:5000,
                onDownloadProgress: (progressEvent) => {
               
                downloadedData1 = progressEvent.loaded;
                var end_time = new Date().getTime();
                        var duration = end_time-start_time;
                        console.log(duration+"d")
                        var speed = (
                        (downloadedData1 * 8) /
                        1000000 /
                        (5)
                    ).toFixed(2);
                    console.log(speed);
                    setDspeed(speed)
                    setCurrent(speed)
            } })
                .then((res)=>{
                        var end_time = new Date().getTime();
                        var duration = end_time-start_time;
                        console.log(duration+"d")
                        var speed = (
                        (downloadedData1 * 8) /
                        1000000 /
                        (duration)
                    ).toFixed(2);
                    console.log(speed);
                    setDspeed(speed)
                })
            
            }catch(err){
                console.log(err); 
                var end_time = new Date().getTime();
                        var duration = end_time-start_time;
                        console.log(duration+"d")
                        var speed = (
                        (downloadedData1 * 8) /
                        1000000 /
                        (duration)
                    ).toFixed(2);
                    console.log(speed);
                    setDspeed(speed)
                    setCurrent(speed)
            }
           
        
            
    }
    const getDownloadSpeed2 = async() =>{ 
        var start_time = new Date().getTime();
            try{
            return await axios({
                method:"get",
                url:DOWNLOAD_URL+ "?_=" + new Date().getTime()+ "&_Thread2",
                timeout:5000,
                onDownloadProgress: (progressEvent) => {

                downloadedData2 = progressEvent.loaded;
                var end_time = new Date().getTime();
                        var duration = end_time-start_time;
                        console.log(duration+"d")
                        var speed = (
                        (downloadedData1 * 8) /
                        1000000 /
                        (5)
                    ).toFixed(2);
                    console.log(speed);
                    setDspeed(speed)
                    setCurrent(speed)
            } })
                .then((res)=>{
                        
                })
            
            }catch(err){
                console.log(err); 
                var end_time = new Date().getTime();
                        var duration = end_time-start_time;
                        console.log(duration+"d")
                        var speed = (
                        (downloadedData1 * 8) /
                        1000000 /
                        (duration)
                    ).toFixed(2);
                    console.log(speed);
                    setDspeed(speed)
                    setCurrent(speed)
            }
          
            
    }
    const getDownloadSpeed3 = async() =>{ 
        var start_time = new Date().getTime();
            try{
            return await axios({
                method:"get",
                url:DOWNLOAD_URL+ "?_=" + new Date().getTime()+ "&_Thread3",
                timeout:5000,
                onDownloadProgress: (progressEvent) => {

                downloadedData3 = progressEvent.loaded;
                 var end_time = new Date().getTime();
                        var duration = end_time-start_time;
                        console.log(duration+"d")
                        var speed = (
                        (downloadedData1 * 8) /
                        1000000 /
                        (5)
                    ).toFixed(2);
                    console.log(speed);
                    setDspeed(speed)
                    setCurrent(speed)
            } })
                .then((res)=>{
                })
            
            }catch(err){
                console.log(err); 
               
            }
           
    
        
    }
     const getDownloadSpeed4 = async() =>{
            // const controller = new AbortController();
            var start_time = new Date().getTime();
            try{
            return await axios({
                method:"get",
                url:DOWNLOAD_URL+ "?_=" + new Date().getTime()+ "&_Thread4",
                timeout:5000,
                onDownloadProgress: (progressEvent) => {

                
                downloadedData4 = progressEvent.loaded;
                var end_time = new Date().getTime();
                        var duration = end_time-start_time;
                        console.log(duration+"d")
                        var speed4 = (
                        (downloadedData1 * 8) /
                        1000000 /
                        (5)
                    ).toFixed(2);
                    console.log(speed4);
                    setDspeed(speed4)
            } })
                .then((res)=>{
                        
                })
            
            }catch(err){
                console.log(err); 
                var end_time = new Date().getTime();
                        var duration = end_time-start_time;
                        console.log(duration+"d")
                        var speed = (
                        (downloadedData1 * 8) /
                        1000000 /
                        (duration)
                    ).toFixed(2);
                    console.log(speed);
                    setDspeed(speed)
                    setCurrent(speed)
            }

        
            
            //setTimeout(controller.abort(),50000);
        }
        useEffect(()=>{
            if(once){
            onclickHandler();
            setOnce(false);
            }
        });
   // ping =  getPing();
    console.log(ping);
    // var min = Math.min.apply(Math,ping);
    // console.log(min);
    return(
        <>
        <TitleBar />
        <Box sx= {{padding:10, margin:5}} >
	    
		
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={4} lg ={3} xl={3} >
             <Card sx ={{padding:1,height:'30vh'}}>
                {flag && <Img alt="gif" src={pic}  />}
                {!flag && <Img alt="gif" src={correct}  />}

             </Card>
    
        </Grid>
        <Grid item xs={12} sm={8} md={4} lg ={3} xl={3} >
          
            <Card sx ={{padding:'1vh',height:'30vh'}}>
                    <Typography variant="h5" display='block'>
                    
                        Ping
                        <Divider/> 
                        <Img alt="gif" src={refresh}  />
                    </Typography>
                    <Typography></Typography>
                    
                    <Typography variant='h6'>
                        {`${ping}`} ms
                    </Typography>
                </Card>
          
        </Grid>
        <Grid item xs={12} sm={8} md={4} lg ={3} xl={3} >
    
            <Card sx ={{padding:1,height:'30vh'}}>
                    <Typography variant='h5' display='block'>
                        Download
                        <Divider/> 
                        <Img alt="gif" src={download}  />
                    </Typography>
                    
                    <Typography variant='h6'>
                       {`${dspeed}`} Mbps
                    </Typography>
                </Card>

        </Grid>
        <Grid item xs={12} sm={8} md={4} lg ={3} xl={3} >
          
            <Card sx ={{padding:1,height:'30vh'}}>
                    <Typography variant='h5' display='block'>
                        Upload
                        <Divider/> 
                        <Img alt="gif" src={upload}  />
                    </Typography>
                   
                        <Typography variant='h6'>
                       {`${upSpeed}`} Mbps
                    </Typography>
                </Card>
        
        </Grid>
        {flag &&<Grid item xs={12} sm={8} md={4} lg ={3} xl={3} >
        
            <Card  >       
                <Typography variant='h7'>
                        {`${current}`} 
                    </Typography>
                </Card>
        
        </Grid>}
        {!flag &&<Grid item xs={12} sm={8} md={4} lg ={3} xl={3} >
          
            <Card  >
                    <Typography>
                    
                <Button class="testButton" onClick={onclickHandler}>Again</Button>
                </Typography>
            
                </Card>
          
        </Grid>}
      </Grid>
    </Box>
    </Box>
    
    </>)
};

export default Details;

	
	
	// <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
	// 		<Box gridColumn="span 3" xs={12}>
    //             <Card sx ={{padding:1,height:'30vh'}}>
    //             {flag && <Img alt="gif" src={pic}  />}
    //             {!flag && <Img alt="gif" src={correct}  />}

    //             </Card>
	// 		</Box>
	// 		<Box gridColumn="span 3" xs>
	// 			<Card sx ={{padding:'1vh',height:'30vh'}}>
    //                 <Typography variant="h5" display='block'>
                    
    //                     Ping
    //                     <Divider/> 
    //                     <Img alt="gif" src={refresh}  />
    //                 </Typography>
    //                 <Typography></Typography>
                    
    //                 <Typography variant='h6'>
    //                     {`${ping}`} ms
    //                 </Typography>
    //             </Card>
	// 		</Box>
	// 		<Box gridColumn="span 3" xs={12}>
	// 			<Card sx ={{padding:1,height:'30vh'}}>
    //                 <Typography variant='h5' display='block'>
    //                     Download
    //                     <Divider/> 
    //                     <Img alt="gif" src={download}  />
    //                 </Typography>
                    
    //                 <Typography variant='h6'>
    //                    {`${dspeed}`} Mbps
    //                 </Typography>
    //             </Card>
	// 		</Box>
	// 		<Box gridColumn="span 3 " xs={12}>
	// 			<Card sx ={{padding:1,height:'30vh'}}>
    //                 <Typography variant='h5' display='block'>
    //                     Upload
    //                     <Divider/> 
    //                     <Img alt="gif" src={upload}  />
    //                 </Typography>
                   
    //                     <Typography variant='h6'>
    //                    {`${upSpeed}`} Mbps
    //                 </Typography>
    //             </Card>
	// 		</Box>
    //         {flag &&<Box gridColumn="span 3 " xs={12}>
	// 			<Card  >
        
                    
    //             <Typography variant='h7'>
    //                     {`${current}`} 
    //                 </Typography>
                
            
    //             </Card>
	// 		</Box>}
    //         	{!flag &&<Box gridColumn="span 3 " xs={1}>
	// 			<Card  >
    //                 <Typography>
                    
    //             <Button class="testButton" onClick={onclickHandler}>Again</Button>
    //             </Typography>
            
    //             </Card>
	// 		</Box>}
            	
	// 	</Box>
