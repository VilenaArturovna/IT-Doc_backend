type MessageEntityType =
  | 'mention'
  | 'hashtag'
  | 'cashtag'
  | 'bot_command'
  | 'url'
  | 'emai'
  | 'phone_number'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'spoiler'
  | 'code'
  | 'pre'
  | 'text_lin'
  | 'text_mention'
  | 'custom_emoji';

interface TelegramWebhookUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  can_join_groups?: boolean;
  can_read_all_group_messages?: boolean;
  supports_inline_queries?: boolean;
}

interface TelegramWebhookChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}

interface TelegramWebhookMessageEntity {
  type: MessageEntityType;
  offset: number;
  length: number;
  url?: string;
  language?: string;
  custom_emoji_id?: string;
  user?: TelegramWebhookUser;
}

interface TelegramWebhookMessage {
  message_id: number;
  message_thread_id?: number;
  from?: TelegramWebhookUser;
  date: number;
  sender_chat?: TelegramWebhookChat;
  chat: TelegramWebhookChat;
  text?: string;
  entities?: TelegramWebhookMessageEntity[];
}

interface TelegramWebhookCallbackQuery {
  id: string;
  from: TelegramWebhookUser;
  message?: TelegramWebhookMessage;
  inline_message_id?: string;
  chat_instance?: string;
  data?: string;
}

export class TelegramWebhookRequestDto {
  update_id: number;
  message?: TelegramWebhookMessage;
  callback_query?: TelegramWebhookCallbackQuery;
}
