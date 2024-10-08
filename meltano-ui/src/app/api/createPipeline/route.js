// src/app/api/createPipeline/route.js

import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(req) {
  const { projectName } = await req.json();
  
  if (!projectName) {
    return NextResponse.json({ message: 'Project name is required.' }, { status: 400 });
  }

  const meltanoPath = path.join('/app/meltano');
  
  try {
    // Execute the Meltano command to create a new project
    const { stdout, stderr } = await execPromise(`cd ${meltanoPath} && meltano init ${projectName}`);
    
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return NextResponse.json({ message: `Failed to create pipeline: ${stderr}` }, { status: 500 });
    }

    console.log(stdout);
    return NextResponse.json({ message: `Pipeline '${projectName}' created successfully!` }, { status: 200 });
  } catch (error) {
    console.error('Error executing command:', error);
    return NextResponse.json({ message: 'Failed to create pipeline. An error occurred.' }, { status: 500 });
  }
}
