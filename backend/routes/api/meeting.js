const express = require('express');
const { createMeeting, googleRedirect ,getMeetings} = require('../../controllers/MeetingController');

const router = express.Router();

router.route('/meeting/google/redirect/').get(googleRedirect);

router.route('/generate-meeting').post(createMeeting);
router.route('/getmeetings').get(getMeetings)
module.exports = router;