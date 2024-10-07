import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    isCollapsed: boolean
    projects: {
        label: string
        icon: React.ReactNode
    }[]
}

const ProjectSwitcher = ({
    isCollapsed,
    projects
}: Props) => {
    const [selectedProject, setSelectedProject] = React.useState<string>(
        projects[0].label
      )
  return (
    <Select defaultValue={selectedProject} onValueChange={setSelectedProject}>
      <SelectTrigger
        className={cn(
            "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
            isCollapsed &&
              "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
          )}
        aria-label="Select bot"
      >
        <SelectValue placeholder="Select an account">
          {projects.find((project) => project.label === selectedProject)?.icon}
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {
              projects.find((project) => project.label === selectedProject)
                ?.label
            }
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
            <SelectItem key={project.label} value={project.label}>
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                    {project.icon}
                    {project.label}
                </div>
            </SelectItem>
            ))}
        <Separator/>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className='w-full' variant='select' value="new-bot">
                  <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="10" y="4" width="4" height="16" fill="black"/>
                          <rect x="4" y="10" width="16" height="4" fill="black"/>
                      </svg>
                      Create new Project
                  </div>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-md py-5 gap-10 p-4">
              <DrawerHeader>
                <DrawerTitle>Create New Project</DrawerTitle>
              </DrawerHeader>
              <Select>
                
              </Select>
              <div className='gap-4 p-4'>
                <Input className='gap-4' placeholder="Name your project"/>
                <Textarea placeholder='Enter a description for your project'></Textarea>
              </div>
              
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
          </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>    
      </SelectContent>
    </Select>
  )
}

export default ProjectSwitcher