const db = require('../database');

const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, fileUrl } = req.body;
    const senderId = req.user.userId;

    if (!receiverId || !content) {
      return res.status(400).json({ error: 'Receiver ID and content are required' });
    }

    const message = await db.messages.create({
      data: {
        senderId,
        receiverId,
        content,
        fileUrl
      }
    });

    // Notify receiver
    await db.notifications.create({
      data: {
        userId: receiverId,
        title: 'New Message Received',
        message: content.substring(0, 60) + (content.length > 60 ? '...' : '')
      }
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to deliver message' });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const userId = req.user.userId;

    const messages = await db.messages.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: partnerId },
          { senderId: partnerId, receiverId: userId }
        ]
      }
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve conversation history' });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await db.notifications.findMany({
      where: { userId: req.user.userId }
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
  getNotifications
};
