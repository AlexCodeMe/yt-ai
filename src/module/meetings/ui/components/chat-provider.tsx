import { LoadingState } from '@/components/loading-state'
import { authClient } from '@/lib/auth-client'
import { ChatUi } from './chat-ui'

interface ChatProviderProps {
  meetingId: string
  meetingName: string
}

export function ChatProvider({ meetingId, meetingName }: ChatProviderProps) {
  const { data, isPending } = authClient.useSession()

  if (isPending || !data?.user) {
    return (
      <LoadingState
        title='loading..'
        description='Please wait while we load the chat'
      />
    )
  }

  return (
    <ChatUi
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? ''}
    />
  )
}
