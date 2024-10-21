// src/app/api/projects/route.js

import { NextResponse } from 'next/server';

export async function GET(req) {
  const meltanoApiUrl = 'http://meltano:5000/api/execute-command'; // Use the Meltano API for executing commands
  
  try {
    // Define the command to list project directories
    const command = 'if [ "$(ls -A /app/meltano/projects)" ]; then ls -l /app/meltano/projects; else echo "No projects found"; fi';

    // Send a request to the Meltano API to execute the command
    const response = await fetch(meltanoApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({ command }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Failed to fetch project directories' }, { status: response.status });
    }

    const { message } = await response.json();

    // Split the output into lines and remove the first line
    const outputLines = message.trim().split('\n');

    // Check if the output contains the "No projects found" message
    if (outputLines.length === 1 && outputLines[0].includes("No projects found")) {
      return NextResponse.json({ projects: [] }, { status: 200 });
    }

    // Process the remaining lines (skipping the first one)
    const projectDirectories = outputLines.slice(1).map(line => {
      const parts = line.split(/\s+/); // Split by whitespace
      const name = parts[parts.length - 1]; // Get the last part as the name
      const createdAt = new Date(); // Create a new date object for now

      return { name, createdAt }; // Assuming creation date is current; adjust logic as needed
    });

    return NextResponse.json({ projects: projectDirectories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects. An error occurred.' }, { status: 500 });
  }
}
