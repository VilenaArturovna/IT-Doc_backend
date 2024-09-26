import { DateVO } from '@libs/value-objects';

export interface TelegramBotInlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
}

export interface TelegramBotInlineKeyboard {
  inline_keyboard: [TelegramBotInlineKeyboardButton[]];
}

export interface TelegramBotSendMessageData {
  chat_id: number | string;
  text: string;
  parse_mode?: 'HTML' | 'MarkdownV2';
  reply_markup?: TelegramBotInlineKeyboard;
}

export interface TelegramBotDeleteMessage {
  chat_id: number | string;
  message_id: number;
}

export interface SendMessageResponse {
  data: {
    ok: boolean;
    result: {
      message_id: number;
      from: {
        id: number;
        is_bot: boolean;
        first_name: string;
        username: string;
      };
      chat: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        type: string;
      };
      date: number;
      text: string;
      reply_markup?: TelegramBotInlineKeyboard;
    };
  };
}

export interface SendMessageError {
  data: {
    ok: boolean;
    error_code: number;
    description: string;
  };
}

export interface WebhookResponse {
  data: {
    ok: boolean;
    result?: {
      url: string;
      has_custom_certificate: boolean;
      pending_update_count: number;
    };
    error_code?: number;
    description?: string;
  };
}

export interface ISendWelcomeMessageRequest {
  firstname: string;
  tgId: string;
}

export interface INewTaskHasBeenAssignedRequest {
  tgIds: string[];
  taskId: string;
}

export interface INewOrderHasBeenRegisteredRequest {
  tgIds: string[];
  orderId: string;
  orderNumber: string;
}

export interface INewOrderHasBeenAssignedRequest {
  tgId: string;
  orderId: string;
  orderNumber: string;
}

export interface IDeadlineIsApproachingRequest {
  tgId: string;
  orderId: string;
  orderNumber: string;
  deadline: DateVO;
  isCopy: boolean;
}

export interface IDeadlineIsApproachingWithoutResponsibleStaffRequest {
  tgId: string;
  orderId: string;
  orderNumber: string;
  deadline: DateVO;
}

export interface IStaffRegisteredRequest {
  tgId: string;
  staffName: string;
}
