import { LoopsClient } from 'loops';

// Initialize the Loops client if API key is available
// This helps prevent creating multiple instances
let loopsClient: LoopsClient | null = null;

export function getLoopsClient(): LoopsClient | null {
  // Only create the client once
  if (loopsClient === null) {
    const apiKey = process.env.LOOPS_API_KEY;
    
    if (!apiKey) {
      console.warn('LOOPS_API_KEY is not defined. Loops integration is disabled.');
      return null;
    }
    
    try {
      loopsClient = new LoopsClient(apiKey);
    } catch (error) {
      console.error('Failed to initialize Loops client:', error);
      return null;
    }
  }
  
  return loopsClient;
}

// Function to safely send events to Loops
export async function sendLoopsEvent(
  email: string, 
  eventName: string, 
  eventProperties?: Record<string, any>
): Promise<boolean> {
  const loops = getLoopsClient();
  
  if (!loops) {
    return false;
  }
  
  try {
    await loops.sendEvent({
      email,
      eventName,
      eventProperties
    });
    return true;
  } catch (error) {
    console.error(`Failed to send event "${eventName}" to Loops:`, error);
    return false;
  }
}

// Function to create or update a contact in Loops
export async function updateLoopsContact(
  email: string,
  properties: Record<string, any>
): Promise<boolean> {
  const loops = getLoopsClient();
  
  if (!loops) {
    return false;
  }
  
  try {
    await loops.updateContact(email, properties);
    return true;
  } catch (error) {
    console.error('Failed to update contact in Loops:', error);
    return false;
  }
} 