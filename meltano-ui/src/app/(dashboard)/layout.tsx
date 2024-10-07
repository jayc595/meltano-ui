"use client"

import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';
import Nav from './_components/nav';
import { BOTTOM_SIDE_MENU, TOP_SIDE_MENU } from '../../../constants/menu';
import ProjectSwitcher from './_components/project-switcher';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({
    children,
}: DashboardLayoutProps) => {
    const defaultCollapsed = false; 
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

    return (
        <div className='h-screen'>
            <ResizablePanelGroup
      direction="horizontal"
      className="h-full border"
    >
      <ResizablePanel 
        defaultSize={10} 
        minSize={10} 
        maxSize={15} 
        collapsible={true}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
        }}
        onExpand={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
        }}
        className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
        <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <ProjectSwitcher 
              isCollapsed={isCollapsed} 
              projects={[
                {
                  label: 'Ecomnova Reporting',
                  icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>Vercel</title>
                      <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
                    </svg>
                  )

                }
              ]}
            
            />
        </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={
              TOP_SIDE_MENU
            }
          >
          </Nav>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={
              BOTTOM_SIDE_MENU
            }
          >
          </Nav>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={85}>
        <div className="flex h-full items-center justify-center p-6">
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
        </div>
        
        
    );
}

export default DashboardLayout;
