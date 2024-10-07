import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req) {
  try {
    // Define the path to the meltano projects folder
    const meltanoProjectsPath = path.join(process.cwd(), '../meltano'); // Adjust the path as necessary

    // Read the directory contents
    const directories = await fs.readdir(meltanoProjectsPath, { withFileTypes: true });

    // Filter the contents to include only directories
    const projectDirectories = directories
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // Return the directory names as JSON
    return new Response(JSON.stringify({ projects: projectDirectories }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    return new Response(JSON.stringify({ error: 'Failed to read directory' }), {
      status: 500,
    });
  }
}
