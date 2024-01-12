from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

TOKEN: Final = '6614625526:AAHyWOocwVEvee_PiViwVnAfY1f-7C8lF0U'
BOT_USERNAME: Final = '@Glinax_bot'

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Hi there, this is Glinax welcome')

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('I am an educational bot ready to answer all your STEM related questions and provide course materials 😊')

def handle_response(text: str):
    processed: str = text.lower()
    if 'hello' in processed:
        return 'hey there'
    else:
        return 'i dont understand'

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message_type: str = update.message.chat.type
    text: str = update.message.text

    print(f'User ({update.message.chat.id}) in {message_type}: "{text}" ')

    if message_type == 'group':
        if BOT_USERNAME in text:
            new_text: str = text.replace(BOT_USERNAME, '').strip()
            response: str = handle_response(new_text)
        else:
            return
    else:
        response: str = handle_response(text)
    print('Bot:', response)
    await update.message.reply_text(response)

async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}')

if __name__ == '__main__':
    print('starting bot...')
    app = Application.builder().token(TOKEN).build()
    # commands
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    # messages
    app.add_handler(MessageHandler(filters.TEXT, handle_message))
    # errors
    app.add_error_handler(error)
    # polling
    print('Polling...')
    app.run_polling(poll_interval=2)
