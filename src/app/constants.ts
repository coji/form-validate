interface RouteTitle {
  pathname: string
  title: string
  description: string
  warning?: string
}
export const RouteTitles: RouteTitle[] = [
  {
    pathname: '/rhf_oldstyle_fetch',
    title: 'React Hook Form - Old Style Fetch',
    description: 'Client Side Rendering and Fetch API',
  },
  {
    pathname: '/rhf_oldstyle_serveractions',
    title: 'React Hook Form - Old Style Server Actions',
    description: 'Client Side Rendering and Server Actions',
    warning: 'This example doesn’t work after the soft navigation.',
  },
  {
    pathname: '/rhf_form_fetch',
    title: 'React Hook Form - Form Fetch',
    description: 'Form component and Fetch API',
  },
  {
    pathname: '/rhf_form_serveractions',
    title: 'React Hook Form - Form Server Actions',
    description:
      'Form component / useActionState / Server Actions / useTransition',
  },
  {
    pathname: '/conform_oldstyle_fetch',
    title: 'Conform - Oldstyle Fetch',
    description: 'Client Side Rendering and Fetch API',
  },
  {
    pathname: '/conform_form_serveractions',
    title: 'Conform - Server Actions',
    description: 'Client Side Rendering and Server Actions',
  },
  {
    pathname: '/conform_dynamic',
    title: 'Conform - Dynamic',
    description: 'Dynamic form rendering',
  },
]
