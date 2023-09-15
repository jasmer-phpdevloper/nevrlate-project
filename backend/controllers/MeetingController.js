
const Meeting = require('../models/Meeting');
const { google } = require('googleapis');
const querystring = require('querystring');
const axios = require('axios');
const validateMeetingInput = require("../validation/meeting");


const googleCalenderAuth = async () => {
  const { GoogleClientId,GoogleClientSecret,RedirectUricalender } = process.env;
    const credentials = {
        client_id: GoogleClientId,
        client_secret: GoogleClientSecret,
        redirect_uris: RedirectUricalender,
      };
      
      console.log(credentials);
  
      const Oauth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris
      );
  
      const authUrl = Oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
      });
      console.log('Authorize this app by visiting this URL:', authUrl);
    
      return authUrl;
}

exports.createMeeting = async (req, res) => {

    const { errors, isValid } = validateMeetingInput(req.body);

    if (!isValid) {
      // return res.json(errors);
      return res.json({ error: errors });
    }
  
        const meetingInfo = req.body
       
        // const organizer = await User.findOne({ id: userId })
        // if (organizer === null) {
        //   return new HttpResponseCreated({
        //     message: 'Something wrong with the request',
        //   })
        // }
        const title= meetingInfo. meetingDetails.title;
        const startTime= meetingInfo.meetingDetails.start_time;
        const description= meetingInfo.meetingDetails.description;
        const duration= meetingInfo.meetingDetails.duration;
        const meetingType=meetingInfo.meetingDetails.type;
        const invitees =meetingInfo.selectAttendees.map(item => item.value);

        if(meetingType!=='zoom'){
          const newMeetingData = {
            title:title,
            duration: duration,
            description:description,
            importance:meetingInfo.rating,
            meetingUrl:'',
            meetingPlatform:meetingInfo.meetingDetails.type,
            status:meetingInfo.meetingDetails.status,
            meetingId:'',
            meetingPassword:'',
            startTime: startTime,
            // organizerId:'ggfdgdfgfdgfdg',
            attendees:invitees,
          };
          const meeting=await Meeting.create(newMeetingData);
          const authUrl = await  googleCalenderAuth();
          const responseData = { message: 'meeting created succesfully',authUrl:authUrl};
          res.json(responseData);
        }
        else{

        
      
        const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
     
        const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';
        const request = await axios.post(
          ZOOM_OAUTH_ENDPOINT,
          querystring.stringify({ grant_type: 'account_credentials', account_id: ZOOM_ACCOUNT_ID }),
          {
            headers: {
              Authorization: `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}`,
            },
          },
        );
    
        const { access_token } = await request.data;
    
        const accessToken=access_token;
        const formatTime = new Date(startTime);
        const formattedStartTime = formatTime.toISOString();
    
        // const invitees =meetingInfo.selectAttendees.map(item => item.value);

        const response = await axios.post(
          'https://api.zoom.us/v2/users/protolabznaveenphp@gmail.com/meetings',
          {
            topic: title,
            type: 2, // 1 for instant meeting, 2 for scheduled meeting
            start_time: formattedStartTime, // Replace with your desired meeting start time
            duration: duration, // Meeting duration in minutes
            timezone: 'America/New_York', // Replace with your desired timezone
            agenda:description,
            settings: {
              host_video: true,
              participant_video: true,
              join_before_host: false,
              registrants_email_notification: true,
              meeting_invitees: invitees.map(email => ({ email })),
              registrants_confirmation_email: true,
              cn_meeting: false,
              in_meeting: true,
              mute_upon_entry: false,
              watermark: false,
              use_pmi: false,
              approval_type: 2,
              audio: 'both',
              auto_recording: 'local',
              enforce_login: false,
              waiting_room: true,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
      
        );
    
        try {
        
          // console.log(response);

          const newMeetingData = {
            title:title,
            duration: duration,
            description:description,
            importance:meetingInfo.rating,
            meetingUrl:response.data.join_url,
            meetingPlatform:meetingInfo.meetingDetails.type,
            status:meetingInfo.meetingDetails.status,
            meetingId:response.data.id,
            meetingPassword:response.data.password,
            startTime: startTime,
            // organizerId:'ggfdgdfgfdgfdg',
            attendees:invitees,
          };
          const meeting=await Meeting.create(newMeetingData);
          console.log(meeting);

           const authUrl = await  googleCalenderAuth();

          //  res.redirect(authUrl);
         
          const responseData = { message: 'meeting created succesfully',authUrl:authUrl};
          res.json(responseData);
          // res.json('success');
        } catch (err) {
          console.log(err)
          res.status(500).json(err);
        }
      }
       
}
exports.googleRedirect = async (req, res) => {

    const authorizationCode=req.query.code;

    const { GoogleClientId,GoogleClientSecret,RedirectUricalender } = process.env;
 
    const credentials = {
        client_id: GoogleClientId,
        client_secret: GoogleClientSecret,
        redirect_uris: RedirectUricalender,
    };
    console.log(credentials);
    const Oauth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris
    );
 
    const latestMeeting = await Meeting.findOne().sort({ createdAt: -1 });
    const attendees=latestMeeting.attendees;
   
  
  Oauth2Client.getToken(authorizationCode, async(err, token) => {
      if (err) {
        console.error('Error retrieving access token:', err);
        return;
      }
     
      const refresh_token = token.access_token;
      Oauth2Client.setCredentials({ refresh_token });

      const calendar = google.calendar('v3');
      //zoom meeting 
      if(latestMeeting.meetingPlatform=='zoom'){
      const response = await calendar.events.insert({
        auth: Oauth2Client,
        calendarId: 'primary',
        requestBody: {
          attendees:  attendees.map(email => ({ email, responseStatus: 'needsAction' })), // email that you want to add as a guest
          summary: latestMeeting.title, // title of the event
          description: `Naveen Ghanghas is inviting you to a scheduled Zoom meeting
                            <br/> Join Zoom Meeting
                            <br/> ${latestMeeting.meetingUrl} 
                            <br/> Meeting ID: ${latestMeeting.meetingId}
                            <br/> Passcode: ${latestMeeting.meetingPassword}`,
          location: `${latestMeeting.meetingUrl}`,
          colorId: '2', // you can check the docs for different colors
          start: {
            dateTime: new Date(latestMeeting.startTime).toISOString(), // event start date
            timeZone: 'America/New_York',
          },
          end: {
            dateTime: new Date(new Date(latestMeeting.startTime).getTime() + latestMeeting.duration * 60 * 1000).toISOString(), // event end date, 1 hour from now
            timeZone: 'America/New_York',
          },
        },
      });
      res.redirect('http://localhost:3000/meeting');
      
    }else{
      //google meet
      const event = {
        summary:latestMeeting.title,
        location: 'Virtual Meeting',
        description: latestMeeting.description,
        start: {
          dateTime: new Date(latestMeeting.startTime).toISOString(), // Start time of the event
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: new Date(new Date(latestMeeting.startTime).getTime() + latestMeeting.duration * 60 * 1000).toISOString(), // End time, 1 hour from now
          timeZone: 'America/New_York',
        },
        attendees: attendees.map(email => ({ email })),
        conferenceData: {
          createRequest: {
            requestId: 'meeting-request-idsdsd',
          },
        },
      };
      
    
      try {
        const response = await calendar.events.insert({
          calendarId: 'primary',
          resource: event,
          conferenceDataVersion: 1,
          auth: Oauth2Client,
        });
       console.log(response);
        const meetLink = response.data.hangoutLink;
        latestMeeting.meetingUrl = meetLink;
        await latestMeeting.save();

        console.log('Google Meet link: ', meetLink);
        res.redirect('http://localhost:3000/meeting')
      } catch (error) {
        console.error('Error creating event: ', error);
      }
    }

      

      // console.log(response);
      //  res.redirect('http://localhost:3000/meeting');
    })
}
exports.getMeetings = async (req, res) => {

  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'An error occurred' });
  }

  }

   