// const API_BASE_URL = '/api';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// unique idempotency key for each request
const generateIdempotencyKey = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const fetchWithRetry = async (url, options, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // If network error
      if (!response.ok && attempt < maxRetries - 1) {
        // backoff
        const delay = Math.pow(2, attempt) * 500;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 500;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

export const createExpense = async (expenseData) => {
  const idempotencyKey = generateIdempotencyKey();
  
  const response = await fetchWithRetry(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Idempotency-Key': idempotencyKey
    },
    body: JSON.stringify(expenseData)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create expense');
  }
  
  return data;
};

export const getExpenses = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category && filters.category !== 'All') {
    params.append('category', filters.category);
  }
  
  if (filters.sort) {
    params.append('sort', filters.sort);
  }
  
  const url = `${API_BASE_URL}/expenses${params.toString() ? '?' + params.toString() : ''}`;
  
  const response = await fetchWithRetry(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch expenses');
  }
  
  return data;
};

export const deleteExpense = async (id) => {
  const response = await fetchWithRetry(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete expense');
  }
  
  return data;
};

