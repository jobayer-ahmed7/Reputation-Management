declare module '@tawk.to/tawk-messenger-react' {
  import { FC, ReactNode } from 'react'
  
  interface TawkMessengerReactProps {
    propertyId: string
    widgetId: string
    style?: React.CSSProperties
    [key: string]: any
  }
  
  const TawkMessengerReact: FC<TawkMessengerReactProps>
  export default TawkMessengerReact
}