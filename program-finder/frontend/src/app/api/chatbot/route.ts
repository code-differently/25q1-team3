import { NextResponse } from 'next/server'
import { SessionsClient } from '@google-cloud/dialogflow'
import path from 'path'

const projectId = process.env.DIALOGFLOW_PROJECT_ID
const keyFilePath = path.join(process.cwd(), process.env.DIALOGFLOW_KEY_FILE!)

const sessionClient = new SessionsClient({
  keyFilename: keyFilePath
})

interface ChatRequest {
  message: string
  userId: string
}

interface DialogflowRequest {
  session: string
  queryInput: {
    text: {
      text: string
      languageCode: string
    }
  }
}

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json() as ChatRequest

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'Message and userId are required' },
        { status: 400 }
      )
    }

    // Create a unique session ID for each user
    const sessionId = userId
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId!,
      sessionId
    )

    // Create the request to Dialogflow
    const dialogflowRequest: DialogflowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en',
        },
      },
    }

    // Send request to Dialogflow
    const [response] = await sessionClient.detectIntent(dialogflowRequest)
    const result = response.queryResult

    if (!result) {
      throw new Error('No response from Dialogflow')
    }

    return NextResponse.json({
      reply: result.fulfillmentText || 'Sorry, I did not understand that.',
      intent: result.intent?.displayName,
      confidence: result.intentDetectionConfidence,
    })
  } catch (error) {
    console.error('Error in chatbot API:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}