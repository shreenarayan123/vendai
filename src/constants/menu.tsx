import CalIcon from '@/icons/cal-icon'
import ChatIcon from '@/icons/chat-icon'
import DashboardIcon from '@/icons/dashboard-icon'
import EmailIcon from '@/icons/email-icon'
import HelpDeskIcon from '@/icons/help-desk-icon'
import IntegrationsIcon from '@/icons/integrations-icon'
import SettingsIcon from '@/icons/settings-icon'
import { HardDriveDownload } from 'lucide-react'

type SIDE_BAR_MENU_PROPS = {
    label: string
    icon: JSX.Element
    path: string
  }

  export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: 'dashboard',
    },
    {
      label: 'Conversations',
      icon: <ChatIcon />,
      path: 'conversation',
    },
    {
      label: 'Integrations',
      icon: <IntegrationsIcon />,
      path: 'integration',
    },
    {
      label: 'Settings',
      icon: <SettingsIcon />,
      path: 'settings',
    },
    {
      label: 'Appointments',
      icon: <CalIcon />,
      path: 'appointment',
    },
    {
      label: 'Campaigns',
      icon: <EmailIcon />,
      path: 'email-marketing',
    },
    {
      label: 'Installation',
      icon: <HardDriveDownload />,
      path: 'installation',
    }
]

type TABS_MENU_PROPS = {
  label: string
  icon?: JSX.Element
}

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'knowledge base',
  },
  {
    label: 'questions',
  },
]

export const APPOINTMENT_TABLE_HEADER = [
  'Name',
  'RequestedTime',
  'Added Time',
  'Domain',
]

export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Answers', 'Domain']

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
    icon: <ChatIcon />,
  },
  {
    label: 'helpdesk',
    icon: <HelpDeskIcon />,
  },
]