const Session = require('../model/Session')



exports.createSession = async (req, res) => {
    const { startTime, endTime } = req.body;
  
    try {
      const newSession = new Session({
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });
  
      await newSession.save();
  
      res.status(201).json({ message: 'Session created successfully.', session: newSession });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.listFreeSessions = async (req, res) => {
  try {
    const freeSessions = await Session.find({ bookedBy: null });
    res.json({ freeSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.bookSession = async (req, res) => {
    const { sessionId , uni} = req.body;
  
    try {
      const session = await Session.findById(sessionId);
      if (!session || session.bookedBy) {
        return res.status(400).json({ message: 'Session not available for booking.' });
      }
  
      session.bookedBy = uni;
      await session.save();
  
      res.json({ message: 'Session booked successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.listPendingSessions = async (req, res) => {
    try {
        const {universityId} = req.body;
      const pendingSessions = await Session.find({ bookedBy:universityId  });
      res.json({ pendingSessions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.listPendingSessionsAfterSlot = async (req, res) => {
    try {
      const currentTime = new Date();
      const {universityId} = req.body;
      const pendingSessions = await Session.find({
        bookedBy: universityId,
        startTime: { $lt: currentTime },
      });
      res.json({ pendingSessions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  