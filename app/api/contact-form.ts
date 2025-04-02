import { NextResponse } from 'next/server';
import { LoopsClient, APIError, RateLimitExceededError } from 'loops';

// This is a placeholder for the actual Loops API integration
// When implementing, you'll need to use the Loops API client

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const data: ContactFormData = await request.json();
    
    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Please provide name, email, and message' },
        { status: 400 }
      );
    }
    
    // For security, validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Initialize the Loops client (the API key should be stored in environment variables)
    // If no API key is available, we'll just log the submission and return success
    const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
    
    // Prepare the contact's name components
    const nameParts = data.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    
    // Log the submission regardless of whether we use Loops
    console.log('Contact form submission:', {
      email: data.email,
      name: data.name,
      message: data.message,
      submitted_at: new Date().toISOString(),
    });
    
    if (LOOPS_API_KEY) {
      try {
        // Initialize the Loops client
        const loops = new LoopsClient(LOOPS_API_KEY);
        
        // No longer adding contact to Loops audience - only sending transactional emails
        
        // Send a transactional email to notify the team about the support request
        await loops.sendTransactionalEmail({
          transactionalId: 'cm8z98vor0pfz143ca06lgmu1',
          email: 'hi@joshmead.me', // Send to your support email
          dataVariables: {
            firstName: firstName,
            lastName: lastName,
            message: data.message,
            email: data.email,
            submitted_at: new Date().toISOString(),
          }
        });
        
        // Removed sendEvent call as it would also track the user in Loops
        
        console.log('Successfully sent transactional emails via Loops');
      } catch (loopsError) {
        if (loopsError instanceof RateLimitExceededError) {
          console.error(`Rate limit exceeded (${loopsError.limit} per second)`);
          // We could implement retry logic here, but for now we'll just log and continue
        } else if (loopsError instanceof APIError) {
          console.error('Loops API error:', loopsError.json, loopsError.statusCode);
        } else {
          console.error('Loops error:', loopsError);
        }
        // Even if Loops fails, we still want to return success to the user
        // as we've captured their request and could process it manually if needed
      }
    } else {
      // If no API key is available, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('No LOOPS_API_KEY found, skipping Loops integration');
    }
    
    // Return success response to the client
    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully'
    });
    
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 