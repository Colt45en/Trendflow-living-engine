const axios = require('axios');

// Mock data for development
const mockMerchItems = [
  { 
    id: 1,
    name: 'Signature Creator Tee', 
    price: 34.99, 
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Apparel',
    rating: 4.8,
    reviews: 124,
    featured: true,
    stock: 50
  },
  // ... other items (same as frontend data but with numeric prices)
];

const mockCart = {};
const mockSalesData = {
  totalRevenue: 12500,
  totalOrders: 342,
  averageOrderValue: 36.55,
  topProducts: [
    { name: 'Premium Creative Hoodie', sales: 89 },
    { name: 'Signature Creator Tee', sales: 124 },
    { name: 'Limited Edition Cap', sales: 156 }
  ]
};

const apiController = {
  // YouTube API endpoints
  getChannelStats: async (req, res) => {
    try {
      const { YOUTUBE_API_KEY, CHANNEL_ID } = process.env;
      
      if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
        return res.status(200).json({
          subscribers: '1.2M+',
          views: '50M+',
          videos: 156,
          joinDate: '2020-03-15'
        });
      }

      // Real implementation would use YouTube API
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
      );

      const data = response.data.items[0];
      res.json({
        subscribers: parseInt(data.statistics.subscriberCount).toLocaleString(),
        views: parseInt(data.statistics.viewCount).toLocaleString(),
        videos: data.statistics.videoCount,
        joinDate: data.snippet.publishedAt.split('T')[0]
      });
    } catch (error) {
      console.error('YouTube API Error:', error.message);
      res.status(200).json({
        subscribers: '1.2M+',
        views: '50M+',
        videos: 156,
        joinDate: '2020-03-15'
      });
    }
  },

  getLatestVideos: async (req, res) => {
    try {
      const { YOUTUBE_API_KEY, CHANNEL_ID } = process.env;
      
      if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
        return res.status(200).json([
          {
            title: "How I Built My Dream Studio Setup",
            thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
            views: "127K",
            duration: "12:45",
            publishedAt: "2024-01-15T10:00:00Z"
          }
          // ... more mock videos
        ]);
      }

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&order=date&type=video&key=${YOUTUBE_API_KEY}`
      );

      const videos = response.data.items.map(video => ({
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
        publishedAt: video.snippet.publishedAt
      }));

      res.json(videos);
    } catch (error) {
      console.error('YouTube Videos Error:', error.message);
      res.status(200).json([
        {
          title: "How I Built My Dream Studio Setup",
          thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
          views: "127K",
          duration: "12:45",
          publishedAt: "2024-01-15T10:00:00Z"
        }
      ]);
    }
  },

  // Merch endpoints
  getMerchItems: (req, res) => {
    const { category, featured } = req.query;
    let filteredItems = mockMerchItems;

    if (category && category !== 'All') {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (featured === 'true') {
      filteredItems = filteredItems.filter(item => item.featured);
    }

    res.json(filteredItems);
  },

  getMerchItem: (req, res) => {
    const { id } = req.params;
    const item = mockMerchItems.find(item => item.id === parseInt(id));
    
    if (!item) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(item);
  },

  // Cart endpoints
  addToCart: (req, res) => {
    const { userId, itemId, quantity = 1 } = req.body;
    
    if (!mockCart[userId]) {
      mockCart[userId] = [];
    }

    const existingItem = mockCart[userId].find(item => item.id === itemId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const product = mockMerchItems.find(item => item.id === itemId);
      if (product) {
        mockCart[userId].push({ ...product, quantity });
      }
    }

    res.json({ success: true, cart: mockCart[userId] });
  },

  getCart: (req, res) => {
    const { userId } = req.params;
    res.json(mockCart[userId] || []);
  },

  updateCart: (req, res) => {
    const { userId } = req.params;
    const { itemId, quantity } = req.body;

    if (!mockCart[userId]) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = mockCart[userId].findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (quantity === 0) {
      mockCart[userId].splice(itemIndex, 1);
    } else {
      mockCart[userId][itemIndex].quantity = quantity;
    }

    res.json({ success: true, cart: mockCart[userId] });
  },

  removeFromCart: (req, res) => {
    const { userId, itemId } = req.params;

    if (!mockCart[userId]) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    mockCart[userId] = mockCart[userId].filter(item => item.id !== parseInt(itemId));
    res.json({ success: true, cart: mockCart[userId] });
  },

  // Checkout endpoint
  createCheckoutSession: async (req, res) => {
    try {
      const { items, userId } = req.body;
      
      // In a real implementation, you would use Stripe
      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ['card'],
      //   line_items: items.map(item => ({
      //     price_data: {
      //       currency: 'usd',
      //       product_data: { name: item.name },
      //       unit_amount: Math.round(item.price * 100),
      //     },
      //     quantity: item.quantity,
      //   })),
      //   mode: 'payment',
      //   success_url: `${process.env.FRONTEND_URL}/success`,
      //   cancel_url: `${process.env.FRONTEND_URL}/cart`,
      // });

      // Mock response
      res.json({
        success: true,
        sessionId: 'mock_session_id_' + Date.now(),
        url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success`
      });
    } catch (error) {
      console.error('Checkout error:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  },

  // Analytics endpoints
  getSalesData: (req, res) => {
    res.json(mockSalesData);
  },

  getTrafficData: (req, res) => {
    res.json({
      totalVisitors: 15420,
      uniqueVisitors: 8923,
      conversionRate: 2.2,
      popularProducts: ['Premium Creative Hoodie', 'Signature Creator Tee', 'Limited Edition Cap']
    });
  }
};

module.exports = apiController;