/**
 * Idempotency middleware to handle duplicate requests
 * This prevents duplicate expenses when clients retry due to network issues
 */

export const checkIdempotency = async (req, res, next) => {
  const idempotencyKey = req.headers['x-idempotency-key'];
  
  if (!idempotencyKey) {
    return res.status(400).json({
      success: false,
      error: 'Idempotency key is required. Include X-Idempotency-Key header.'
    });
  }
  
  // Store the key in request for use in controller
  req.idempotencyKey = idempotencyKey;
  next();
};

