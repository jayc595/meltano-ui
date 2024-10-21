// src/app/api/createPipeline/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  const { projectName } = await req.json();
  
  if (!projectName) {
    return NextResponse.json({ message: 'Project name is required.' }, { status: 400 });
  }

  const meltanoApiUrl = 'http://meltano:5000/api/execute-command'; // Meltano API endpoint

  // Constructing the command payload to send to the Meltano API
  const commandPayload = {
    command: `cd projects && meltano init ${projectName}`
  };

  try {
    // Send a request to the Meltano API
    const response = await fetch(meltanoApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commandPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: `Failed to create pipeline: ${data.message}` }, { status: response.status });
    }

    return NextResponse.json({ message: `Pipeline '${projectName}' created successfully!` }, { status: 200 });
  } catch (error) {
    console.error('Error executing command:', error);
    return NextResponse.json({ message: 'Failed to create pipeline. An error occurred.', error: error.message }, { status: 500 });
  }
}
