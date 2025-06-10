import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MeetingGetOne } from '../../types'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from 'lucide-react'
import Link from 'next/link'
import { GeneratedAvatar } from '@/components/generated-avatar'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { formatDuration } from '@/lib/utils'
import Markdown from 'react-markdown'
import { Transcript } from './transcript'
import { ChatProvider } from './chat-provider'

interface CompletedStateProps {
  data: MeetingGetOne
}

export function CompletedState({ data }: CompletedStateProps) {
  return (
    <div className='flex flex-col gap-y-4'>
      <Tabs defaultValue='summary'>
        <div className='bg-white rounded-lg border px-3'>
          <ScrollArea>
            <TabsList className='p-0 bg-background justify-center rounded-none h-13'>
              <TabsTrigger
                value='summary'
                className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value='transcript'
                className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value='recording'
                className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value='chat'
                className='text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground'
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
        <TabsContent value='chat'>
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>
        <TabsContent value='transcript'>
          <Transcript meetingId={data.id} />
        </TabsContent>
        <TabsContent value='recording'>
          <div className='bg-white rounded-lg border px-4 py-5'>
            <video
              src={data.recordingUrl!}
              className='w-full rounded-lg'
              controls
            />
          </div>
        </TabsContent>
        <TabsContent value='summary'>
          <div className='bg-white rounded-lg border'>
            <div className='px-4 py-5 gap-y-5 flex flex-col col-span-5'>
              <h2 className='text-2xl capitalize font-medium'>{data.name}</h2>
              <div className='flex gap-x-2 items-center'>
                <Link
                  href={`/agents/${data.agent.id}`}
                  className='flex items-center gap-x-2 underline underline-offset-4 capitalize'
                >
                  <GeneratedAvatar
                    variant='botttsNeutral'
                    seed={data.agent.name}
                    className='size-5'
                  />
                  {data.agent.name}
                </Link>{' '}
                <p>{data.startedAt ? format(data.startedAt, 'PPP') : ''}</p>
              </div>
              <div className='flex gap-x-2 items-center'>
                <SparklesIcon className='size-4' />
                <p>General Summary</p>
              </div>
              <Badge
                variant='outline'
                className='flex items-center gap-x-2 [&>svg]:size-4'
              >
                <ClockFadingIcon className='text-blue-700' />
                {data.duration ? formatDuration(data.duration) : ''}
              </Badge>
              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 {...props} className='text-2xl font-medium mb-6'></h1>
                    ),
                    h2: (props) => (
                      <h1 {...props} className='text-xl font-medium mb-6'></h1>
                    ),
                    h3: (props) => (
                      <h1 {...props} className='text-lg font-medium mb-6'></h1>
                    ),
                    h4: (props) => (
                      <h1
                        {...props}
                        className='text-base font-medium mb-6'
                      ></h1>
                    ),
                    p: (props) => (
                      <p {...props} className='mb-6 leading-relaxed'></p>
                    ),
                    ul: (props) => (
                      <ul
                        {...props}
                        className='list-disc list-inside mb-6'
                      ></ul>
                    ),
                    ol: (props) => (
                      <ol
                        {...props}
                        className='list-decimal list-inside mb-6'
                      ></ol>
                    ),
                    li: (props) => <li {...props} className='mb-1'></li>,
                    strong: (props) => (
                      <strong {...props} className='font-semibold'></strong>
                    ),
                    code: (props) => (
                      <code
                        {...props}
                        className='bg-gray-100 px-1 py-0.5 rounded'
                      ></code>
                    ),
                    blockquote: (props) => (
                      <blockquote
                        {...props}
                        className='border-l-4 pl-4 italic my-4'
                      ></blockquote>
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
