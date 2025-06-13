import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandResponsiveDialog,
} from '@/components/ui/command'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function DashboardCommand({ open, setOpen }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const trpc = useTRPC()
  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({
      search,
      pageSize: 100,
    })
  )
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search,
      pageSize: 100,
    })
  )

  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput
        placeholder='Find a meeting or agent...'
        value={search}
        onValueChange={(value) => setSearch(value)}
      />
      <CommandGroup heading='Meetings'>
        <CommandEmpty className='text-muted-foreground text-sm'>
          <span>No meetings found</span>
        </CommandEmpty>
        {meetings.data?.items.map((meeting) => (
          <CommandItem
            key={meeting.id}
            onSelect={() => {
              router.push(`/meetings/${meeting.id}`)
              setOpen(false)
            }}
          >
            {meeting.name}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandGroup heading='Agents'>
        <CommandEmpty className='text-muted-foreground text-sm'>
          <span>No agents found</span>
        </CommandEmpty>
        {agents.data?.items.map((agent) => (
          <CommandItem
            key={agent.id}
            onSelect={() => {
              router.push(`/agents/${agent.id}`)
              setOpen(false)
            }}
          >
            {agent.name}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandResponsiveDialog>
  )
}
