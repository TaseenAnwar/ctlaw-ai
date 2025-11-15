// Simple rate limiter to track usage per user

class RateLimiter {
  constructor() {
    // In-memory storage (in production, you'd use Redis)
    this.requests = new Map();
  }
  
  async checkLimit(userId, limit, windowMs = 3600000) {
    // windowMs default = 1 hour
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => now - timestamp < windowMs);
    
    if (validRequests.length >= limit) {
      const oldestRequest = validRequests[0];
      const resetTime = oldestRequest + windowMs;
      const minutesUntilReset = Math.ceil((resetTime - now) / 60000);
      
      return {
        allowed: false,
        remaining: 0,
        resetIn: minutesUntilReset
      };
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(userId, validRequests);
    
    return {
      allowed: true,
      remaining: limit - validRequests.length,
      resetIn: Math.ceil(windowMs / 60000)
    };
  }
  
  async incrementUsage(userId) {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    userRequests.push(now);
    this.requests.set(userId, userRequests);
  }
  
  async resetUser(userId) {
    this.requests.delete(userId);
  }
}

// Export singleton instance
const rateLimiter = new RateLimiter();

module.exports = rateLimiter;
