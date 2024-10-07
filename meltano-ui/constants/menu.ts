import { Spline, SettingsIcon,ScrollText, LucideIcon, LogOut, History, Clock } from "lucide-react";

type SIDE_MENU_PROPS = {
    title: string
    label?: string
    icon: LucideIcon
    link: string
    variant: "default" | "ghost"
}

export const TOP_SIDE_MENU: SIDE_MENU_PROPS[] = [
    {
        title: 'Pipelines',
        label: '128',
        icon: Spline,
        link: '/pipelines',
        variant: 'default'
    },
    {
        title: 'Logs',
        icon: ScrollText,
        link: '/logs',
        variant: 'ghost'
    },
    {
        title: 'History',
        icon: History,
        link: '/history',
        variant: 'ghost'
    },
    {
        title: 'Schedule',
        icon: Clock,
        link: '/schedule',
        variant: 'ghost'
    },
    {
        title: 'Settings',
        icon: SettingsIcon,
        link: '/settings',
        variant: 'ghost'
    }
]

export const BOTTOM_SIDE_MENU: SIDE_MENU_PROPS[] = [
    {
        title: 'Logout',
        icon: LogOut,
        link: '/logout',
        variant: 'ghost'
    }
]
