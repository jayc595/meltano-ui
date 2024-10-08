import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req) {
  try {
    
    // Define the path to the meltano projects folder
    const meltanoProjectsPath = path.join('/app/meltano');

    // Read the directory contents
    const directories = await fs.readdir(meltanoProjectsPath, { withFileTypes: true });

    // Fetch name and creation date for each directory
    const projectDirectories = await Promise.all(
      directories
        .filter(dirent => dirent.isDirectory())
        .map(async dirent => {
          const fullPath = path.join(meltanoProjectsPath, dirent.name);
          const stats = await fs.stat(fullPath); // Get directory metadata
          return {
            name: dirent.name,
            createdAt: stats.birthtime, // Use birthtime for creation date
          };
        })
    );

    // Return the directory names and creation dates as JSON
    return new Response(JSON.stringify({ projects: projectDirectories }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    return new Response(JSON.stringify({ error: 'Failed to read directoryssss' }), {
      status: 500,
    });
  }
}
