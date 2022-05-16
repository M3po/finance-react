import React from 'react';

type IMessageStatus = 'success' | 'warning' | 'info' | 'danger';

export interface IMessage {
  title: string;
  text: string;
  status: IMessageStatus;
}

export const NotificationContext = React.createContext<{
  message: IMessage | null;
  setMessage: (message: IMessage | null) => void;
}>({
  message: null,
  setMessage: () => {},
});

NotificationContext.displayName = 'NotificationContext';

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [message, setMessage] = React.useState<IMessage | null>(null);

  const contextValue = {
    message,
    setMessage: React.useCallback((messagePayload: IMessage | null) => setMessage(messagePayload), []),
  };

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};
